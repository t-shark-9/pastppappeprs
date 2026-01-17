// History management using Fabric.js JSON serialization
class HistoryManager {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
        this.maxHistorySize = 50;
        this.isRestoring = false;
        
        this.bindEvents();
    }

    bindEvents() {
        const undoBtn = document.getElementById('undoBtn');
        if (undoBtn) {
            undoBtn.addEventListener('click', () => this.undo());
        }

        const redoBtn = document.getElementById('redoBtn');
        if (redoBtn) {
            redoBtn.addEventListener('click', () => this.redo());
        }
    }

    saveState(description = 'Action') {
        // Don't save state while restoring
        if (this.isRestoring) return;
        
        // Get canvas manager
        const canvas = window.canvasManager?.canvas;
        if (!canvas) return;

        // Remove any states after current index (when doing new action after undo)
        if (this.currentIndex < this.history.length - 1) {
            this.history.splice(this.currentIndex + 1);
        }

        // Create state snapshot using Fabric.js JSON
        const state = {
            timestamp: Date.now(),
            description: description,
            canvasJSON: JSON.stringify(canvas.toJSON(['objectType']))
        };

        this.history.push(state);

        // Limit history size
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
        } else {
            this.currentIndex++;
        }

        this.updateUndoRedoButtons();
    }

    undo() {
        if (!this.canUndo()) return false;

        this.currentIndex--;
        this.restoreState(this.history[this.currentIndex]);
        this.updateUndoRedoButtons();
        
        return true;
    }

    redo() {
        if (!this.canRedo()) return false;

        this.currentIndex++;
        this.restoreState(this.history[this.currentIndex]);
        this.updateUndoRedoButtons();
        
        return true;
    }

    restoreState(state) {
        const canvas = window.canvasManager?.canvas;
        if (!canvas || !state) return;

        this.isRestoring = true;
        
        canvas.loadFromJSON(state.canvasJSON, () => {
            canvas.requestRenderAll();
            this.isRestoring = false;
        });
    }

    canUndo() {
        return this.currentIndex > 0;
    }

    canRedo() {
        return this.currentIndex < this.history.length - 1;
    }

    updateUndoRedoButtons() {
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');

        if (undoBtn) {
            undoBtn.disabled = !this.canUndo();
            undoBtn.style.opacity = this.canUndo() ? '1' : '0.5';
        }

        if (redoBtn) {
            redoBtn.disabled = !this.canRedo();
            redoBtn.style.opacity = this.canRedo() ? '1' : '0.5';
        }
    }

    clearHistory() {
        this.history = [];
        this.currentIndex = -1;
        this.updateUndoRedoButtons();
    }

    getHistorySize() {
        return this.history.length;
    }

    getMemoryUsage() {
        let totalSize = 0;
        
        this.history.forEach(state => {
            if (state.canvasJSON) {
                totalSize += state.canvasJSON.length * 2; // Rough estimate for UTF-16
            }
        });
        
        return {
            bytes: totalSize,
            megabytes: (totalSize / (1024 * 1024)).toFixed(2)
        };
    }

    optimizeHistory() {
        const usage = this.getMemoryUsage();
        
        if (parseFloat(usage.megabytes) > 50) {
            const itemsToRemove = Math.floor(this.history.length * 0.3);
            this.history.splice(0, itemsToRemove);
            this.currentIndex = Math.max(0, this.currentIndex - itemsToRemove);
            
            this.updateUndoRedoButtons();
            console.log(`History optimized: removed ${itemsToRemove} items`);
        }
    }

    exportHistory() {
        return {
            history: this.history,
            currentIndex: this.currentIndex,
            timestamp: Date.now()
        };
    }

    importHistory(historyData) {
        if (!historyData || !Array.isArray(historyData.history)) return false;

        this.history = historyData.history;
        this.currentIndex = historyData.currentIndex;
        
        if (this.currentIndex < 0 || this.currentIndex >= this.history.length) {
            this.currentIndex = this.history.length - 1;
        }
        
        this.updateUndoRedoButtons();
        
        return true;
    }
}
