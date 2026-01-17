// Canvas management using Fabric.js
class CanvasManager {
    constructor() {
        this.canvas = null;
        this.zoom = 1;
        this.pan = { x: 0, y: 0 };
        this.currentMode = 'select';
        this.isDrawing = false;
        this.drawingObject = null;
        this.startPoint = null;
        this.freeDrawingPath = [];
        
        this.setupCanvas();
        this.bindEvents();
    }

    setupCanvas() {
        // Initialize Fabric.js canvas
        this.canvas = new fabric.Canvas('mainCanvas', {
            width: 800,
            height: 600,
            backgroundColor: '#ffffff',
            selection: true,
            preserveObjectStacking: true,
            enableRetinaScaling: true,
            stopContextMenu: true,
            fireRightClick: true
        });

        // Remove overlay canvas (Fabric.js handles this internally)
        const overlayCanvas = document.getElementById('overlayCanvas');
        if (overlayCanvas) {
            overlayCanvas.remove();
        }

        // Set default selection style
        fabric.Object.prototype.set({
            transparentCorners: false,
            cornerColor: 'hsl(233, 47%, 30%)',
            cornerStrokeColor: 'hsl(233, 47%, 30%)',
            borderColor: 'hsl(233, 47%, 30%)',
            cornerSize: 10,
            cornerStyle: 'circle',
            borderDashArray: [5, 5],
            padding: 5
        });

        // Custom controls for rotation
        fabric.Object.prototype.controls.mtr = new fabric.Control({
            x: 0,
            y: -0.5,
            offsetY: -30,
            cursorStyle: 'crosshair',
            actionHandler: fabric.controlsUtils.rotationWithSnapping,
            actionName: 'rotate',
            render: this.renderRotateControl,
            cornerSize: 20,
            withConnection: true
        });

        // Set up clipboard for copy/paste
        this.clipboard = null;

        console.log('Fabric.js canvas initialized');
    }

    renderRotateControl(ctx, left, top, styleOverride, fabricObject) {
        const size = 16;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'hsl(233, 47%, 30%)';
        ctx.fill();
        
        // Draw rotation icon
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, size / 4, 0, 1.5 * Math.PI);
        ctx.stroke();
        
        ctx.restore();
    }

    bindEvents() {
        // Canvas events
        this.canvas.on('mouse:down', this.handleMouseDown.bind(this));
        this.canvas.on('mouse:move', this.handleMouseMove.bind(this));
        this.canvas.on('mouse:up', this.handleMouseUp.bind(this));
        this.canvas.on('mouse:wheel', this.handleWheel.bind(this));
        
        // Object events
        this.canvas.on('object:modified', () => {
            window.historyManager?.saveState('Object modified');
        });

        this.canvas.on('selection:created', (e) => {
            this.updatePropertiesPanel(e.selected);
        });

        this.canvas.on('selection:updated', (e) => {
            this.updatePropertiesPanel(e.selected);
        });

        this.canvas.on('selection:cleared', () => {
            this.updatePropertiesPanel([]);
        });

        // Keyboard events
        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        // Right-click context menu
        this.canvas.on('mouse:down', (opt) => {
            if (opt.button === 3) {
                this.showContextMenu(opt.e);
            }
        });
    }

    handleMouseDown(opt) {
        const pointer = this.canvas.getPointer(opt.e);
        this.startPoint = pointer;

        if (this.currentMode === 'select') {
            return; // Let Fabric.js handle selection
        }

        this.isDrawing = true;
        const props = window.toolManager.getProperties();

        switch (this.currentMode) {
            case 'line':
                this.drawingObject = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
                    stroke: props.strokeColor,
                    strokeWidth: props.strokeWidth,
                    strokeDashArray: this.getStrokeDashArray(props.strokeStyle),
                    opacity: props.opacity,
                    selectable: true,
                    evented: true,
                    objectType: 'line'
                });
                this.canvas.add(this.drawingObject);
                break;

            case 'rectangle':
                this.drawingObject = new fabric.Rect({
                    left: pointer.x,
                    top: pointer.y,
                    width: 0,
                    height: 0,
                    stroke: props.strokeColor,
                    strokeWidth: props.strokeWidth,
                    strokeDashArray: this.getStrokeDashArray(props.strokeStyle),
                    fill: props.fillEnabled ? props.fillColor : 'transparent',
                    opacity: props.opacity,
                    selectable: true,
                    evented: true,
                    objectType: 'rectangle'
                });
                this.canvas.add(this.drawingObject);
                break;

            case 'circle':
                this.drawingObject = new fabric.Circle({
                    left: pointer.x,
                    top: pointer.y,
                    radius: 0,
                    stroke: props.strokeColor,
                    strokeWidth: props.strokeWidth,
                    strokeDashArray: this.getStrokeDashArray(props.strokeStyle),
                    fill: props.fillEnabled ? props.fillColor : 'transparent',
                    opacity: props.opacity,
                    originX: 'center',
                    originY: 'center',
                    selectable: true,
                    evented: true,
                    objectType: 'circle'
                });
                this.canvas.add(this.drawingObject);
                break;

            case 'ellipse':
                this.drawingObject = new fabric.Ellipse({
                    left: pointer.x,
                    top: pointer.y,
                    rx: 0,
                    ry: 0,
                    stroke: props.strokeColor,
                    strokeWidth: props.strokeWidth,
                    strokeDashArray: this.getStrokeDashArray(props.strokeStyle),
                    fill: props.fillEnabled ? props.fillColor : 'transparent',
                    opacity: props.opacity,
                    originX: 'center',
                    originY: 'center',
                    selectable: true,
                    evented: true,
                    objectType: 'ellipse'
                });
                this.canvas.add(this.drawingObject);
                break;

            case 'triangle':
                this.drawingObject = new fabric.Triangle({
                    left: pointer.x,
                    top: pointer.y,
                    width: 0,
                    height: 0,
                    stroke: props.strokeColor,
                    strokeWidth: props.strokeWidth,
                    strokeDashArray: this.getStrokeDashArray(props.strokeStyle),
                    fill: props.fillEnabled ? props.fillColor : 'transparent',
                    opacity: props.opacity,
                    selectable: true,
                    evented: true,
                    objectType: 'triangle'
                });
                this.canvas.add(this.drawingObject);
                break;

            case 'arrow':
                this.drawingObject = this.createArrow(pointer.x, pointer.y, pointer.x, pointer.y, props);
                this.canvas.add(this.drawingObject);
                break;

            case 'polygon':
                // Start polygon drawing
                if (!this.polygonPoints) {
                    this.polygonPoints = [pointer];
                } else {
                    this.polygonPoints.push(pointer);
                }
                this.updatePolygonPreview();
                this.isDrawing = false; // Polygon uses clicks, not drag
                break;

            case 'pen':
            case 'brush':
                this.freeDrawingPath = [pointer];
                break;

            case 'highlighter':
                this.freeDrawingPath = [pointer];
                break;

            case 'eraser':
                const target = this.canvas.findTarget(opt.e);
                if (target) {
                    this.canvas.remove(target);
                    window.historyManager?.saveState('Object erased');
                }
                break;

            case 'text':
                this.addTextAtPosition(pointer);
                this.isDrawing = false;
                break;
        }
    }

    handleMouseMove(opt) {
        if (!this.isDrawing || !this.startPoint) return;

        const pointer = this.canvas.getPointer(opt.e);
        const props = window.toolManager.getProperties();

        switch (this.currentMode) {
            case 'line':
                if (this.drawingObject) {
                    this.drawingObject.set({
                        x2: pointer.x,
                        y2: pointer.y
                    });
                    this.canvas.renderAll();
                }
                break;

            case 'rectangle':
            case 'triangle':
                if (this.drawingObject) {
                    const width = Math.abs(pointer.x - this.startPoint.x);
                    const height = Math.abs(pointer.y - this.startPoint.y);
                    
                    this.drawingObject.set({
                        left: Math.min(pointer.x, this.startPoint.x),
                        top: Math.min(pointer.y, this.startPoint.y),
                        width: width,
                        height: height
                    });
                    this.canvas.renderAll();
                }
                break;

            case 'circle':
                if (this.drawingObject) {
                    const radius = Math.sqrt(
                        Math.pow(pointer.x - this.startPoint.x, 2) +
                        Math.pow(pointer.y - this.startPoint.y, 2)
                    );
                    this.drawingObject.set({ radius: radius });
                    this.canvas.renderAll();
                }
                break;

            case 'ellipse':
                if (this.drawingObject) {
                    const rx = Math.abs(pointer.x - this.startPoint.x);
                    const ry = Math.abs(pointer.y - this.startPoint.y);
                    this.drawingObject.set({ rx: rx, ry: ry });
                    this.canvas.renderAll();
                }
                break;

            case 'arrow':
                if (this.drawingObject) {
                    this.canvas.remove(this.drawingObject);
                    this.drawingObject = this.createArrow(
                        this.startPoint.x, this.startPoint.y,
                        pointer.x, pointer.y,
                        props
                    );
                    this.canvas.add(this.drawingObject);
                    this.canvas.renderAll();
                }
                break;

            case 'pen':
            case 'brush':
            case 'highlighter':
                this.freeDrawingPath.push(pointer);
                this.drawFreehandPreview();
                break;

            case 'eraser':
                const target = this.canvas.findTarget(opt.e);
                if (target) {
                    this.canvas.remove(target);
                }
                break;
        }
    }

    handleMouseUp(opt) {
        if (!this.isDrawing) return;

        const props = window.toolManager.getProperties();

        if ((this.currentMode === 'pen' || this.currentMode === 'brush' || this.currentMode === 'highlighter') && this.freeDrawingPath.length > 1) {
            const pathData = this.createPathFromPoints(this.freeDrawingPath);
            
            let strokeWidth = props.strokeWidth;
            let strokeColor = props.strokeColor;
            let opacity = props.opacity;
            
            if (this.currentMode === 'brush') {
                strokeWidth *= 2;
            } else if (this.currentMode === 'highlighter') {
                strokeWidth *= 4;
                opacity = 0.4;
                strokeColor = props.highlighterColor || '#ffff00';
            }
            
            const path = new fabric.Path(pathData, {
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: this.getStrokeDashArray(props.strokeStyle),
                fill: null,
                opacity: opacity,
                strokeLineCap: 'round',
                strokeLineJoin: 'round',
                selectable: true,
                evented: true,
                objectType: this.currentMode
            });
            this.canvas.add(path);
            this.clearFreehandPreview();
        }

        this.isDrawing = false;
        this.drawingObject = null;
        this.startPoint = null;
        this.freeDrawingPath = [];
        
        window.historyManager?.saveState('Drawing completed');
    }

    handleWheel(opt) {
        const delta = opt.e.deltaY;
        let zoom = this.canvas.getZoom();
        
        zoom *= 0.999 ** delta;
        zoom = Math.max(0.1, Math.min(5, zoom));
        
        this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        this.zoom = zoom;
        this.updateZoomDisplay();
        
        opt.e.preventDefault();
        opt.e.stopPropagation();
    }

    handleKeyDown(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        const activeObject = this.canvas.getActiveObject();

        // Delete key
        if ((event.key === 'Delete' || event.key === 'Backspace') && activeObject) {
            if (activeObject.type === 'activeSelection') {
                activeObject.forEachObject(obj => this.canvas.remove(obj));
                this.canvas.discardActiveObject();
            } else {
                this.canvas.remove(activeObject);
            }
            this.canvas.requestRenderAll();
            window.historyManager?.saveState('Objects deleted');
            event.preventDefault();
        }

        // Escape to finish polygon
        if (event.key === 'Escape' && this.polygonPoints) {
            this.finishPolygon();
        }

        // Ctrl/Cmd shortcuts
        if (event.ctrlKey || event.metaKey) {
            switch (event.key.toLowerCase()) {
                case 'c':
                    this.copyToClipboard();
                    event.preventDefault();
                    break;
                case 'v':
                    this.pasteFromClipboard();
                    event.preventDefault();
                    break;
                case 'x':
                    this.copyToClipboard();
                    if (activeObject) {
                        if (activeObject.type === 'activeSelection') {
                            activeObject.forEachObject(obj => this.canvas.remove(obj));
                            this.canvas.discardActiveObject();
                        } else {
                            this.canvas.remove(activeObject);
                        }
                    }
                    event.preventDefault();
                    break;
                case 'a':
                    this.selectAll();
                    event.preventDefault();
                    break;
                case 'd':
                    this.duplicateSelection();
                    event.preventDefault();
                    break;
                case 'z':
                    if (event.shiftKey) {
                        window.historyManager?.redo();
                    } else {
                        window.historyManager?.undo();
                    }
                    event.preventDefault();
                    break;
                case 'y':
                    window.historyManager?.redo();
                    event.preventDefault();
                    break;
                case 'g':
                    if (event.shiftKey) {
                        this.ungroupSelection();
                    } else {
                        this.groupSelection();
                    }
                    event.preventDefault();
                    break;
            }
        }

        // Arrow keys for nudging
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key) && activeObject) {
            const delta = event.shiftKey ? 10 : 1;
            switch (event.key) {
                case 'ArrowUp':
                    activeObject.top -= delta;
                    break;
                case 'ArrowDown':
                    activeObject.top += delta;
                    break;
                case 'ArrowLeft':
                    activeObject.left -= delta;
                    break;
                case 'ArrowRight':
                    activeObject.left += delta;
                    break;
            }
            activeObject.setCoords();
            this.canvas.requestRenderAll();
            event.preventDefault();
        }
    }

    // Helper methods
    getStrokeDashArray(style) {
        switch (style) {
            case 'dashed':
                return [12, 6];
            case 'dotted':
                return [3, 6];
            case 'dash-dot':
                return [12, 6, 3, 6];
            default:
                return null;
        }
    }

    createArrow(x1, y1, x2, y2, props) {
        const headSize = Math.max(10, props.strokeWidth * 3);
        const angle = Math.atan2(y2 - y1, x2 - x1);
        
        const arrowHead1X = x2 - headSize * Math.cos(angle - Math.PI / 6);
        const arrowHead1Y = y2 - headSize * Math.sin(angle - Math.PI / 6);
        const arrowHead2X = x2 - headSize * Math.cos(angle + Math.PI / 6);
        const arrowHead2Y = y2 - headSize * Math.sin(angle + Math.PI / 6);

        const pathData = `M ${x1} ${y1} L ${x2} ${y2} M ${arrowHead1X} ${arrowHead1Y} L ${x2} ${y2} L ${arrowHead2X} ${arrowHead2Y}`;

        return new fabric.Path(pathData, {
            stroke: props.strokeColor,
            strokeWidth: props.strokeWidth,
            strokeDashArray: this.getStrokeDashArray(props.strokeStyle),
            fill: null,
            opacity: props.opacity,
            selectable: true,
            evented: true,
            objectType: 'arrow'
        });
    }

    createPathFromPoints(points) {
        if (points.length < 2) return '';
        
        let pathData = `M ${points[0].x} ${points[0].y}`;
        
        if (points.length === 2) {
            pathData += ` L ${points[1].x} ${points[1].y}`;
        } else {
            for (let i = 1; i < points.length - 1; i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                pathData += ` Q ${points[i].x} ${points[i].y} ${xc} ${yc}`;
            }
            const last = points[points.length - 1];
            pathData += ` L ${last.x} ${last.y}`;
        }
        
        return pathData;
    }

    // Polygon drawing
    updatePolygonPreview() {
        // Remove existing preview
        if (this.polygonPreview) {
            this.canvas.remove(this.polygonPreview);
        }
        
        if (this.polygonPoints.length < 2) return;
        
        const props = window.toolManager.getProperties();
        const points = this.polygonPoints.map(p => ({ x: p.x, y: p.y }));
        
        this.polygonPreview = new fabric.Polygon(points, {
            stroke: props.strokeColor,
            strokeWidth: props.strokeWidth,
            strokeDashArray: [5, 5],
            fill: 'transparent',
            opacity: 0.5,
            selectable: false,
            evented: false
        });
        
        this.canvas.add(this.polygonPreview);
        this.canvas.renderAll();
    }

    finishPolygon() {
        if (this.polygonPreview) {
            this.canvas.remove(this.polygonPreview);
        }
        
        if (this.polygonPoints && this.polygonPoints.length >= 3) {
            const props = window.toolManager.getProperties();
            const points = this.polygonPoints.map(p => ({ x: p.x, y: p.y }));
            
            const polygon = new fabric.Polygon(points, {
                stroke: props.strokeColor,
                strokeWidth: props.strokeWidth,
                strokeDashArray: this.getStrokeDashArray(props.strokeStyle),
                fill: props.fillEnabled ? props.fillColor : 'transparent',
                opacity: props.opacity,
                selectable: true,
                evented: true,
                objectType: 'polygon'
            });
            
            this.canvas.add(polygon);
            window.historyManager?.saveState('Polygon created');
        }
        
        this.polygonPoints = null;
        this.polygonPreview = null;
    }

    drawFreehandPreview() {
        const ctx = this.canvas.contextTop;
        const props = window.toolManager.getProperties();
        
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.save();
        
        let strokeWidth = props.strokeWidth;
        let strokeColor = props.strokeColor;
        let opacity = props.opacity;
        
        if (this.currentMode === 'brush') {
            strokeWidth *= 2;
        } else if (this.currentMode === 'highlighter') {
            strokeWidth *= 4;
            opacity = 0.4;
            strokeColor = props.highlighterColor || '#ffff00';
        }
        
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = opacity;
        
        if (this.freeDrawingPath.length > 1) {
            ctx.beginPath();
            ctx.moveTo(this.freeDrawingPath[0].x, this.freeDrawingPath[0].y);
            
            for (let i = 1; i < this.freeDrawingPath.length; i++) {
                ctx.lineTo(this.freeDrawingPath[i].x, this.freeDrawingPath[i].y);
            }
            ctx.stroke();
        }
        
        ctx.restore();
    }

    clearFreehandPreview() {
        const ctx = this.canvas.contextTop;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addTextAtPosition(pointer) {
        const modal = document.getElementById('textModal');
        modal.style.display = 'block';
        this._pendingTextPosition = pointer;
        
        const textInput = document.getElementById('textInput');
        textInput.focus();
        textInput.value = '';
    }

    addText(text, fontFamily, fontSize, bold, italic) {
        if (!text.trim()) return;
        
        const props = window.toolManager.getProperties();
        const position = this._pendingTextPosition || { x: 100, y: 100 };
        
        const fontWeight = bold ? 'bold' : 'normal';
        const fontStyle = italic ? 'italic' : 'normal';

        const textObj = new fabric.IText(text, {
            left: position.x,
            top: position.y,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: fontWeight,
            fontStyle: fontStyle,
            fill: props.strokeColor,
            opacity: props.opacity,
            selectable: true,
            evented: true,
            objectType: 'text'
        });

        this.canvas.add(textObj);
        this.canvas.setActiveObject(textObj);
        this.canvas.requestRenderAll();
        
        this._pendingTextPosition = null;
        window.historyManager?.saveState('Text added');
    }

    // Selection and object manipulation
    selectAll() {
        this.canvas.discardActiveObject();
        const objects = this.canvas.getObjects();
        if (objects.length > 0) {
            const selection = new fabric.ActiveSelection(objects, { canvas: this.canvas });
            this.canvas.setActiveObject(selection);
            this.canvas.requestRenderAll();
        }
    }

    duplicateSelection() {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) return;

        activeObject.clone((cloned) => {
            cloned.set({
                left: cloned.left + 20,
                top: cloned.top + 20
            });
            
            if (cloned.type === 'activeSelection') {
                cloned.canvas = this.canvas;
                cloned.forEachObject((obj) => {
                    this.canvas.add(obj);
                });
                cloned.setCoords();
            } else {
                this.canvas.add(cloned);
            }
            
            this.canvas.setActiveObject(cloned);
            this.canvas.requestRenderAll();
            window.historyManager?.saveState('Objects duplicated');
        });
    }

    groupSelection() {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject || activeObject.type !== 'activeSelection') return;

        const group = activeObject.toGroup();
        group.objectType = 'group';
        this.canvas.requestRenderAll();
        window.historyManager?.saveState('Objects grouped');
    }

    ungroupSelection() {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject || activeObject.type !== 'group') return;

        activeObject.toActiveSelection();
        this.canvas.requestRenderAll();
        window.historyManager?.saveState('Group ungrouped');
    }

    copyToClipboard() {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) return;

        activeObject.clone((cloned) => {
            this.clipboard = cloned;
        });
    }

    pasteFromClipboard() {
        if (!this.clipboard) return;

        this.clipboard.clone((cloned) => {
            this.canvas.discardActiveObject();
            
            cloned.set({
                left: cloned.left + 20,
                top: cloned.top + 20,
                evented: true
            });
            
            if (cloned.type === 'activeSelection') {
                cloned.canvas = this.canvas;
                cloned.forEachObject((obj) => {
                    this.canvas.add(obj);
                });
                cloned.setCoords();
            } else {
                this.canvas.add(cloned);
            }
            
            this.clipboard.top += 20;
            this.clipboard.left += 20;
            this.canvas.setActiveObject(cloned);
            this.canvas.requestRenderAll();
            window.historyManager?.saveState('Objects pasted');
        });
    }

    // Update properties panel when selection changes
    updatePropertiesPanel(selectedObjects) {
        if (!selectedObjects || selectedObjects.length === 0) return;
        
        const obj = selectedObjects[0];
        
        if (obj.stroke) {
            document.getElementById('strokeColor').value = obj.stroke;
        }
        if (obj.fill && obj.fill !== 'transparent') {
            document.getElementById('fillColor').value = obj.fill;
        }
        if (obj.strokeWidth) {
            document.getElementById('strokeWidth').value = obj.strokeWidth;
            document.getElementById('widthDisplay').textContent = obj.strokeWidth + 'px';
        }
        if (obj.opacity !== undefined) {
            document.getElementById('opacity').value = obj.opacity;
            document.getElementById('opacityDisplay').textContent = Math.round(obj.opacity * 100) + '%';
        }
        
        // Update stroke style selector
        const strokeStyleEl = document.getElementById('strokeStyle');
        if (strokeStyleEl) {
            if (!obj.strokeDashArray || obj.strokeDashArray.length === 0) {
                strokeStyleEl.value = 'solid';
            } else if (obj.strokeDashArray[0] === 3) {
                strokeStyleEl.value = 'dotted';
            } else if (obj.strokeDashArray.length === 4) {
                strokeStyleEl.value = 'dash-dot';
            } else {
                strokeStyleEl.value = 'dashed';
            }
        }
    }

    // Apply property changes to selected objects
    applyPropertyToSelection(property, value) {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) return;

        if (activeObject.type === 'activeSelection') {
            activeObject.forEachObject(obj => {
                obj.set(property, value);
            });
        } else {
            activeObject.set(property, value);
        }
        
        this.canvas.requestRenderAll();
        window.historyManager?.saveState('Property changed');
    }

    // Context menu
    showContextMenu(e) {
        e.preventDefault();
        
        const existing = document.querySelector('.canvas-context-menu');
        if (existing) existing.remove();

        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) return;

        const menu = document.createElement('div');
        menu.className = 'canvas-context-menu';
        menu.innerHTML = `
            <div class="context-menu-item" data-action="duplicate"><i class="fas fa-copy"></i> Duplicate</div>
            <div class="context-menu-item" data-action="delete"><i class="fas fa-trash"></i> Delete</div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-item" data-action="bring-front"><i class="fas fa-layer-group"></i> Bring to Front</div>
            <div class="context-menu-item" data-action="send-back"><i class="fas fa-layer-group"></i> Send to Back</div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-submenu">
                <div class="context-menu-item submenu-trigger"><i class="fas fa-paint-brush"></i> Line Style <i class="fas fa-chevron-right" style="margin-left: auto;"></i></div>
                <div class="context-submenu">
                    <div class="context-menu-item" data-action="style-solid">━━━ Solid</div>
                    <div class="context-menu-item" data-action="style-dashed">╌╌╌ Dashed</div>
                    <div class="context-menu-item" data-action="style-dotted">····· Dotted</div>
                    <div class="context-menu-item" data-action="style-dash-dot">╌·╌· Dash-Dot</div>
                </div>
            </div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-item" data-action="flip-h"><i class="fas fa-arrows-alt-h"></i> Flip Horizontal</div>
            <div class="context-menu-item" data-action="flip-v"><i class="fas fa-arrows-alt-v"></i> Flip Vertical</div>
            ${activeObject.type === 'activeSelection' ? '<div class="context-menu-divider"></div><div class="context-menu-item" data-action="group"><i class="fas fa-object-group"></i> Group (Ctrl+G)</div>' : ''}
            ${activeObject.type === 'group' ? '<div class="context-menu-divider"></div><div class="context-menu-item" data-action="ungroup"><i class="fas fa-object-ungroup"></i> Ungroup (Ctrl+Shift+G)</div>' : ''}
        `;

        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px';
        document.body.appendChild(menu);

        // Handle menu clicks
        menu.addEventListener('click', (ev) => {
            const action = ev.target.closest('[data-action]')?.dataset.action;
            if (!action) return;

            switch (action) {
                case 'duplicate':
                    this.duplicateSelection();
                    break;
                case 'delete':
                    if (activeObject.type === 'activeSelection') {
                        activeObject.forEachObject(obj => this.canvas.remove(obj));
                        this.canvas.discardActiveObject();
                    } else {
                        this.canvas.remove(activeObject);
                    }
                    window.historyManager?.saveState('Objects deleted');
                    break;
                case 'bring-front':
                    this.canvas.bringToFront(activeObject);
                    window.historyManager?.saveState('Brought to front');
                    break;
                case 'send-back':
                    this.canvas.sendToBack(activeObject);
                    window.historyManager?.saveState('Sent to back');
                    break;
                case 'style-solid':
                    this.applyPropertyToSelection('strokeDashArray', null);
                    break;
                case 'style-dashed':
                    this.applyPropertyToSelection('strokeDashArray', [12, 6]);
                    break;
                case 'style-dotted':
                    this.applyPropertyToSelection('strokeDashArray', [3, 6]);
                    break;
                case 'style-dash-dot':
                    this.applyPropertyToSelection('strokeDashArray', [12, 6, 3, 6]);
                    break;
                case 'flip-h':
                    activeObject.set('flipX', !activeObject.flipX);
                    this.canvas.requestRenderAll();
                    window.historyManager?.saveState('Flipped horizontal');
                    break;
                case 'flip-v':
                    activeObject.set('flipY', !activeObject.flipY);
                    this.canvas.requestRenderAll();
                    window.historyManager?.saveState('Flipped vertical');
                    break;
                case 'group':
                    this.groupSelection();
                    break;
                case 'ungroup':
                    this.ungroupSelection();
                    break;
            }
            menu.remove();
        });

        setTimeout(() => {
            document.addEventListener('click', function closeMenu(ev) {
                if (!menu.contains(ev.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 0);
    }

    // Mode management
    setMode(mode) {
        this.currentMode = mode;
        
        // Finish any pending polygon
        if (this.polygonPoints && mode !== 'polygon') {
            this.finishPolygon();
        }
        
        if (mode === 'select') {
            this.canvas.selection = true;
            this.canvas.forEachObject(obj => {
                obj.selectable = true;
                obj.evented = true;
            });
            this.canvas.defaultCursor = 'default';
        } else {
            this.canvas.selection = false;
            this.canvas.discardActiveObject();
            this.canvas.forEachObject(obj => {
                obj.selectable = false;
                obj.evented = mode === 'eraser';
            });
            this.canvas.defaultCursor = 'crosshair';
        }
        
        this.canvas.requestRenderAll();
    }

    // Zoom controls
    setZoom(zoom) {
        this.zoom = Math.max(0.1, Math.min(5, zoom));
        this.canvas.setZoom(this.zoom);
        this.updateZoomDisplay();
    }

    zoomIn() {
        this.setZoom(this.zoom * 1.2);
    }

    zoomOut() {
        this.setZoom(this.zoom / 1.2);
    }

    resetZoom() {
        this.setZoom(1);
        this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    }

    fitToScreen() {
        const container = this.canvas.wrapperEl.parentElement;
        const scaleX = (container.clientWidth - 40) / this.canvas.getWidth();
        const scaleY = (container.clientHeight - 40) / this.canvas.getHeight();
        this.setZoom(Math.min(scaleX, scaleY));
    }

    updateZoomDisplay() {
        const zoomLevel = document.getElementById('zoomLevel');
        if (zoomLevel) {
            zoomLevel.textContent = Math.round(this.zoom * 100) + '%';
        }
    }

    // Canvas operations
    clearCanvas() {
        if (confirm('Clear all objects from the canvas?')) {
            this.canvas.clear();
            this.canvas.backgroundColor = '#ffffff';
            this.canvas.requestRenderAll();
            window.historyManager?.saveState('Canvas cleared');
        }
    }

    resizeCanvas(width, height) {
        this.canvas.setWidth(width);
        this.canvas.setHeight(height);
        this.canvas.requestRenderAll();
    }

    // Export/Import
    exportCanvas(format = 'png', quality = 1) {
        const dataURL = this.canvas.toDataURL({
            format: format,
            quality: quality,
            multiplier: 2
        });
        
        const link = document.createElement('a');
        link.download = `illustration.${format}`;
        link.href = dataURL;
        link.click();
    }

    exportJSON() {
        return JSON.stringify(this.canvas.toJSON(['objectType']));
    }

    importJSON(json) {
        this.canvas.loadFromJSON(json, () => {
            this.canvas.requestRenderAll();
            window.historyManager?.saveState('Canvas loaded');
        });
    }

    getDataURL() {
        return this.canvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2
        });
    }

    // For compatibility with old API
    get mainCanvas() {
        return this.canvas.lowerCanvasEl;
    }

    get mainCtx() {
        return this.canvas.contextContainer;
    }

    cancelCurrentOperation() {
        this.isDrawing = false;
        this.drawingObject = null;
        this.startPoint = null;
        this.freeDrawingPath = [];
        this.clearFreehandPreview();
        
        if (this.polygonPoints) {
            this.finishPolygon();
        }
    }
}
