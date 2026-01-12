// Main application file - Initialize and coordinate all components
class IllustrationEditor {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            // Initialize core managers
            this.initializeManagers();
            
            // Bind global events
            this.bindGlobalEvents();
            
            // Set up modals
            this.setupModals();
            
            // Set up file operations
            this.setupFileOperations();
            
            // Set up zoom controls
            this.setupZoomControls();
            
            // Set up text tool modal
            this.setupTextModal();
            
            // Set up additional controls
            this.setupAdditionalControls();
            
            // Initial state save
            setTimeout(() => {
                window.historyManager.saveState('Initial state');
            }, 100);
            
            this.isInitialized = true;
            console.log('Illustration Editor initialized successfully');
            
        } catch (error) {
            console.error('Error initializing Illustration Editor:', error);
            this.showError('Failed to initialize the application');
        }
    }

    initializeManagers() {
        // Initialize managers in the correct order
        window.historyManager = new HistoryManager();
        window.canvasManager = new CanvasManager();
        window.toolManager = new ToolManager();
        window.layerManager = new LayerManager();
        window.imageEditor = new ImageEditor();
        
        console.log('All managers initialized');
    }

    bindGlobalEvents() {
        // Window resize
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleWindowResize();
        }, 250));

        // Prevent accidental page leave
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = '';
            return '';
        });

        // Global keyboard shortcuts
        document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
        
        // Context menu prevention on canvas
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'CANVAS') {
                e.preventDefault();
            }
        });
    }

    handleGlobalKeydown(event) {
        // Skip if typing in input
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Tool shortcuts (when no modifier key)
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
            switch (event.key.toLowerCase()) {
                case 'v':
                    this.setTool('select');
                    event.preventDefault();
                    break;
                case 'p':
                    this.setTool('pen');
                    event.preventDefault();
                    break;
                case 'b':
                    this.setTool('brush');
                    event.preventDefault();
                    break;
                case 'e':
                    this.setTool('eraser');
                    event.preventDefault();
                    break;
                case 'l':
                    this.setTool('line');
                    event.preventDefault();
                    break;
                case 'r':
                    this.setTool('rectangle');
                    event.preventDefault();
                    break;
                case 'o':
                    this.setTool('circle');
                    event.preventDefault();
                    break;
                case 't':
                    this.setTool('text');
                    event.preventDefault();
                    break;
                case 'a':
                    this.setTool('arrow');
                    event.preventDefault();
                    break;
                case 'h':
                    this.setTool('highlighter');
                    event.preventDefault();
                    break;
                case 'escape':
                    this.cancelCurrentOperation();
                    break;
            }
        }
        
        // Brush size shortcuts
        if (event.key === '[') {
            this.adjustBrushSize(-1);
            event.preventDefault();
        } else if (event.key === ']') {
            this.adjustBrushSize(1);
            event.preventDefault();
        }
    }

    setTool(toolName) {
        window.toolManager.setTool(toolName);
    }

    adjustBrushSize(delta) {
        const strokeWidthEl = document.getElementById('strokeWidth');
        const widthDisplayEl = document.getElementById('widthDisplay');
        
        if (strokeWidthEl) {
            const currentSize = parseInt(strokeWidthEl.value);
            const newSize = Utils.clamp(currentSize + delta, 1, 50);
            
            strokeWidthEl.value = newSize;
            if (widthDisplayEl) {
                widthDisplayEl.textContent = newSize + 'px';
            }
            
            window.toolManager.setProperty('strokeWidth', newSize);
        }
    }

    cancelCurrentOperation() {
        if (window.canvasManager) {
            window.canvasManager.cancelCurrentOperation();
        }
        
        // Close any open modals
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    setupModals() {
        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Close button handlers
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    setupFileOperations() {
        // Save document
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveDocument());
        }

        // Export document
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.showExportModal());
        }

        // Insert to editor
        const insertBtn = document.getElementById('insertBtn');
        if (insertBtn) {
            insertBtn.addEventListener('click', () => this.insertToEditor());
        }
        
        // New document
        const newBtn = document.getElementById('newBtn');
        if (newBtn) {
            newBtn.addEventListener('click', () => this.newDocument());
        }
        
        // Open document
        const openBtn = document.getElementById('openBtn');
        if (openBtn) {
            openBtn.addEventListener('click', () => this.openDocument());
        }
    }

    insertToEditor() {
        const imageData = window.canvasManager.getDataURL();
        
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'drawing-insert',
                imageData: imageData
            }, '*');
        } else if (window.opener) {
            window.opener.postMessage({
                type: 'drawing-insert',
                imageData: imageData
            }, '*');
            window.close();
        } else {
            // Fallback to export
            this.exportDocument('png');
        }
    }

    newDocument() {
        if (confirm('Create a new document? This will clear your current work.')) {
            window.canvasManager.canvas.clear();
            window.canvasManager.canvas.backgroundColor = '#ffffff';
            window.canvasManager.canvas.renderAll();
            window.historyManager.clearHistory();
            window.historyManager.saveState('New document');
        }
    }
    
    openDocument() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,image/*';
        
        input.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (file.name.endsWith('.json')) {
                // Load project file
                const text = await file.text();
                try {
                    const project = JSON.parse(text);
                    if (project.canvasJSON) {
                        window.canvasManager.importJSON(project.canvasJSON);
                    }
                } catch (error) {
                    console.error('Error loading project:', error);
                    alert('Error loading project file');
                }
            } else if (file.type.startsWith('image/')) {
                // Load image
                window.imageEditor.loadImage(file);
            }
        });
        
        input.click();
    }

    saveDocument() {
        const project = {
            version: '2.0',
            timestamp: Date.now(),
            canvasJSON: window.canvasManager.exportJSON(),
            layers: window.layerManager.exportLayers()
        };
        
        const blob = new Blob([JSON.stringify(project, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `illustration_${Date.now()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    showExportModal() {
        const modal = document.getElementById('exportModal');
        if (modal) {
            modal.style.display = 'block';
        } else {
            // Fallback to simple export
            this.exportDocument('png');
        }
    }

    exportDocument(format = 'png', quality = 1) {
        window.canvasManager.exportCanvas(format, quality);
    }

    setupZoomControls() {
        const zoomInBtn = document.getElementById('zoomInBtn');
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => window.canvasManager.zoomIn());
        }

        const zoomOutBtn = document.getElementById('zoomOutBtn');
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => window.canvasManager.zoomOut());
        }

        const zoomFitBtn = document.getElementById('zoomFitBtn');
        if (zoomFitBtn) {
            zoomFitBtn.addEventListener('click', () => window.canvasManager.fitToScreen());
        }
        
        const zoomResetBtn = document.getElementById('zoomResetBtn');
        if (zoomResetBtn) {
            zoomResetBtn.addEventListener('click', () => window.canvasManager.resetZoom());
        }
    }

    setupTextModal() {
        const modal = document.getElementById('textModal');
        const textInput = document.getElementById('textInput');
        const fontFamily = document.getElementById('fontFamily');
        const fontSize = document.getElementById('fontSize');
        const boldBtn = document.getElementById('boldBtn');
        const italicBtn = document.getElementById('italicBtn');
        const addTextBtn = document.getElementById('addTextBtn');
        const cancelTextBtn = document.getElementById('cancelTextBtn');

        let isBold = false;
        let isItalic = false;

        if (boldBtn) {
            boldBtn.addEventListener('click', () => {
                isBold = !isBold;
                boldBtn.classList.toggle('active', isBold);
            });
        }

        if (italicBtn) {
            italicBtn.addEventListener('click', () => {
                isItalic = !isItalic;
                italicBtn.classList.toggle('active', isItalic);
            });
        }

        if (addTextBtn) {
            addTextBtn.addEventListener('click', () => {
                const text = textInput.value.trim();
                if (text) {
                    window.canvasManager.addText(
                        text,
                        fontFamily?.value || 'Arial',
                        parseInt(fontSize?.value) || 16,
                        isBold,
                        isItalic
                    );
                }
                modal.style.display = 'none';
            });
        }

        if (cancelTextBtn) {
            cancelTextBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        if (textInput) {
            textInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addTextBtn?.click();
                }
            });
        }
    }
    
    setupAdditionalControls() {
        // Clear canvas button
        const clearBtn = document.getElementById('clearCanvasBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                window.canvasManager.clearCanvas();
            });
        }
        
        // Align buttons
        document.querySelectorAll('[data-align]').forEach(btn => {
            btn.addEventListener('click', () => {
                const alignType = btn.dataset.align;
                this.alignSelectedObjects(alignType);
            });
        });
        
        // Flip buttons
        const flipHBtn = document.getElementById('flipHorizontalBtn');
        if (flipHBtn) {
            flipHBtn.addEventListener('click', () => window.imageEditor.flipHorizontal());
        }
        
        const flipVBtn = document.getElementById('flipVerticalBtn');
        if (flipVBtn) {
            flipVBtn.addEventListener('click', () => window.imageEditor.flipVertical());
        }
        
        // Rotate buttons
        const rotateCWBtn = document.getElementById('rotateCWBtn');
        if (rotateCWBtn) {
            rotateCWBtn.addEventListener('click', () => window.imageEditor.rotateImage(90));
        }
        
        const rotateCCWBtn = document.getElementById('rotateCCWBtn');
        if (rotateCCWBtn) {
            rotateCCWBtn.addEventListener('click', () => window.imageEditor.rotateImage(-90));
        }
    }
    
    alignSelectedObjects(alignType) {
        const canvas = window.canvasManager?.canvas;
        const activeObject = canvas?.getActiveObject();
        
        if (!activeObject || activeObject.type !== 'activeSelection') {
            alert('Please select multiple objects to align.');
            return;
        }
        
        const objects = activeObject.getObjects();
        const groupBounds = activeObject.getBoundingRect();
        
        objects.forEach(obj => {
            switch (alignType) {
                case 'left':
                    obj.set('left', groupBounds.left - activeObject.left + obj.width / 2);
                    break;
                case 'center':
                    obj.set('left', groupBounds.left + groupBounds.width / 2 - activeObject.left);
                    break;
                case 'right':
                    obj.set('left', groupBounds.left + groupBounds.width - activeObject.left - obj.width / 2);
                    break;
                case 'top':
                    obj.set('top', groupBounds.top - activeObject.top + obj.height / 2);
                    break;
                case 'middle':
                    obj.set('top', groupBounds.top + groupBounds.height / 2 - activeObject.top);
                    break;
                case 'bottom':
                    obj.set('top', groupBounds.top + groupBounds.height - activeObject.top - obj.height / 2);
                    break;
            }
            obj.setCoords();
        });
        
        canvas.requestRenderAll();
        window.historyManager?.saveState('Objects aligned');
    }

    handleWindowResize() {
        // Canvas already handles resize via Fabric.js
    }

    showError(message) {
        alert('Error: ' + message);
    }

    showLoading(show = true) {
        const loading = document.querySelector('.loading') || 
            this.createLoadingElement();
        
        loading.style.display = show ? 'block' : 'none';
    }

    createLoadingElement() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.textContent = 'Loading...';
        document.body.appendChild(loading);
        return loading;
    }

    getPerformanceInfo() {
        const usage = window.historyManager.getMemoryUsage();
        const objectCount = window.canvasManager?.canvas?.getObjects().length || 0;
        
        return {
            historyMemoryUsage: usage,
            objectCount: objectCount,
            isInitialized: this.isInitialized
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.illustrationEditor = new IllustrationEditor();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.historyManager) {
        window.historyManager.optimizeHistory();
    }
});
