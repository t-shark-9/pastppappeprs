// Layer management for Fabric.js
class LayerManager {
    constructor() {
        this.layers = [];
        this.activeLayerIndex = -1;
        this.layerIdCounter = 0;
        
        this.createDefaultLayer();
        this.bindEvents();
        this.updateLayersList();
    }

    bindEvents() {
        const addLayerBtn = document.getElementById('addLayerBtn');
        if (addLayerBtn) {
            addLayerBtn.addEventListener('click', () => this.addLayer());
        }

        const deleteLayerBtn = document.getElementById('deleteLayerBtn');
        if (deleteLayerBtn) {
            deleteLayerBtn.addEventListener('click', () => this.deleteActiveLayer());
        }

        const duplicateLayerBtn = document.getElementById('duplicateLayerBtn');
        if (duplicateLayerBtn) {
            duplicateLayerBtn.addEventListener('click', () => this.duplicateActiveLayer());
        }
    }

    createDefaultLayer() {
        const defaultLayer = this.createLayer('Layer 1', true);
        this.setActiveLayer(0);
        return defaultLayer;
    }

    createLayer(name = '', visible = true) {
        const layer = {
            id: ++this.layerIdCounter,
            name: name || `Layer ${this.layerIdCounter}`,
            visible: visible,
            opacity: 1,
            locked: false,
            objects: [] // Store object references
        };

        this.layers.push(layer);
        this.updateLayersList();
        
        return layer;
    }

    addLayer(name = '') {
        const layer = this.createLayer(name);
        this.setActiveLayer(this.layers.length - 1);
        window.historyManager?.saveState('Layer added');
        return layer;
    }

    deleteLayer(index) {
        if (this.layers.length <= 1) {
            alert('Cannot delete the last layer.');
            return false;
        }

        if (index < 0 || index >= this.layers.length) {
            return false;
        }

        // Remove objects associated with this layer
        const layer = this.layers[index];
        const canvas = window.canvasManager?.canvas;
        if (canvas && layer.objects) {
            layer.objects.forEach(obj => {
                canvas.remove(obj);
            });
        }

        this.layers.splice(index, 1);

        if (this.activeLayerIndex >= index) {
            this.activeLayerIndex = Math.max(0, this.activeLayerIndex - 1);
        }

        this.updateLayersList();
        window.historyManager?.saveState('Layer deleted');
        return true;
    }

    deleteActiveLayer() {
        return this.deleteLayer(this.activeLayerIndex);
    }

    duplicateLayer(index) {
        if (index < 0 || index >= this.layers.length) {
            return null;
        }

        const originalLayer = this.layers[index];
        const newLayer = this.createLayer(`${originalLayer.name} Copy`, originalLayer.visible);
        newLayer.opacity = originalLayer.opacity;
        
        // Clone objects from original layer
        const canvas = window.canvasManager?.canvas;
        if (canvas && originalLayer.objects) {
            originalLayer.objects.forEach(obj => {
                obj.clone((cloned) => {
                    cloned.set({
                        left: cloned.left + 10,
                        top: cloned.top + 10
                    });
                    canvas.add(cloned);
                    newLayer.objects.push(cloned);
                });
            });
        }
        
        this.updateLayersList();
        this.setActiveLayer(this.layers.length - 1);
        window.historyManager?.saveState('Layer duplicated');
        
        return newLayer;
    }

    duplicateActiveLayer() {
        return this.duplicateLayer(this.activeLayerIndex);
    }

    setActiveLayer(index) {
        if (index < 0 || index >= this.layers.length) {
            return false;
        }

        this.activeLayerIndex = index;
        this.updateLayersList();
        return true;
    }

    getActiveLayer() {
        return this.layers[this.activeLayerIndex];
    }

    toggleLayerVisibility(index) {
        if (index < 0 || index >= this.layers.length) return;

        const layer = this.layers[index];
        layer.visible = !layer.visible;
        
        // Update visibility of layer's objects
        const canvas = window.canvasManager?.canvas;
        if (canvas && layer.objects) {
            layer.objects.forEach(obj => {
                obj.visible = layer.visible;
            });
            canvas.requestRenderAll();
        }
        
        this.updateLayersList();
        window.historyManager?.saveState('Layer visibility changed');
    }

    renameLayer(index) {
        if (index < 0 || index >= this.layers.length) return;

        const layer = this.layers[index];
        const newName = prompt('Enter new layer name:', layer.name);
        
        if (newName && newName.trim()) {
            layer.name = newName.trim();
            this.updateLayersList();
        }
    }

    setLayerOpacity(index, opacity) {
        if (index < 0 || index >= this.layers.length) return;

        const layer = this.layers[index];
        layer.opacity = Math.max(0, Math.min(1, opacity));
        
        // Update opacity of layer's objects
        const canvas = window.canvasManager?.canvas;
        if (canvas && layer.objects) {
            layer.objects.forEach(obj => {
                obj.opacity = layer.opacity;
            });
            canvas.requestRenderAll();
        }
    }

    moveLayer(fromIndex, toIndex) {
        if (fromIndex < 0 || fromIndex >= this.layers.length ||
            toIndex < 0 || toIndex >= this.layers.length) {
            return false;
        }

        const layer = this.layers.splice(fromIndex, 1)[0];
        this.layers.splice(toIndex, 0, layer);

        if (this.activeLayerIndex === fromIndex) {
            this.activeLayerIndex = toIndex;
        } else if (fromIndex < this.activeLayerIndex && toIndex >= this.activeLayerIndex) {
            this.activeLayerIndex--;
        } else if (fromIndex > this.activeLayerIndex && toIndex <= this.activeLayerIndex) {
            this.activeLayerIndex++;
        }

        this.updateLayersList();
        window.historyManager?.saveState('Layer order changed');
        return true;
    }

    updateLayersList() {
        const layersList = document.getElementById('layersList');
        if (!layersList) return;
        
        layersList.innerHTML = '';

        // Render layers in reverse order (top to bottom)
        for (let i = this.layers.length - 1; i >= 0; i--) {
            const layer = this.layers[i];
            const layerElement = this.createLayerElement(layer, i);
            layersList.appendChild(layerElement);
        }
    }

    createLayerElement(layer, index) {
        const div = document.createElement('div');
        div.className = 'layer-item';
        if (index === this.activeLayerIndex) {
            div.classList.add('active');
        }

        const shortName = layer.name.length > 10 ? layer.name.substring(0, 10) + '...' : layer.name;

        div.innerHTML = `
            <div class="layer-visibility" data-index="${index}">
                <i class="fas ${layer.visible ? 'fa-eye' : 'fa-eye-slash'}"></i>
            </div>
            <div class="layer-name" data-index="${index}" title="${layer.name}">${shortName}</div>
        `;

        div.querySelector('.layer-name').addEventListener('click', () => {
            this.setActiveLayer(index);
        });

        div.querySelector('.layer-visibility').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleLayerVisibility(index);
        });

        div.querySelector('.layer-name').addEventListener('dblclick', () => {
            this.renameLayer(index);
        });

        return div;
    }

    // Assign new objects to active layer
    assignObjectToActiveLayer(obj) {
        const activeLayer = this.getActiveLayer();
        if (activeLayer && obj) {
            activeLayer.objects.push(obj);
        }
    }

    exportLayers() {
        return this.layers.map(layer => ({
            id: layer.id,
            name: layer.name,
            visible: layer.visible,
            opacity: layer.opacity,
            locked: layer.locked
        }));
    }

    importLayers(layersData) {
        this.layers = layersData.map((layerData, index) => ({
            id: layerData.id,
            name: layerData.name,
            visible: layerData.visible,
            opacity: layerData.opacity,
            locked: layerData.locked,
            objects: []
        }));
        
        this.activeLayerIndex = 0;
        this.updateLayersList();
    }
}
