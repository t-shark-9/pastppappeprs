// Tool management - compatible with Fabric.js canvas
class ToolManager {
    constructor() {
        this.currentTool = 'select';
        this.properties = {
            strokeColor: '#000000',
            fillColor: '#ffffff',
            fillEnabled: false,
            strokeWidth: 2,
            strokeStyle: 'solid', // solid, dashed, dotted, dash-dot
            opacity: 1,
            fontSize: 16,
            fontFamily: 'Arial',
            bold: false,
            italic: false,
            highlighterColor: '#ffff00'
        };
        
        this.bindEvents();
    }

    bindEvents() {
        // Regular tool buttons
        document.querySelectorAll('.tool-btn:not(.dropdown-toggle)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tool = btn.dataset.tool;
                if (tool) {
                    this.setTool(tool);
                }
            });
        });

        // Dropdown toggle buttons
        document.querySelectorAll('.dropdown-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const wrapper = btn.closest('.dropdown-wrapper');
                const isOpen = wrapper.classList.contains('open');
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown-wrapper').forEach(w => w.classList.remove('open'));
                
                // Toggle this dropdown
                if (!isOpen) {
                    wrapper.classList.add('open');
                }
            });
        });

        // Dropdown item selection
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const tool = item.dataset.tool;
                if (tool) {
                    this.setTool(tool);
                    
                    // Update dropdown button icon
                    const wrapper = item.closest('.dropdown-wrapper');
                    const toggleBtn = wrapper.querySelector('.dropdown-toggle');
                    const iconEl = item.querySelector('i:first-child');
                    if (iconEl && toggleBtn) {
                        const toggleIcon = toggleBtn.querySelector('i:first-child');
                        if (toggleIcon) {
                            toggleIcon.className = iconEl.className;
                        }
                    }
                    
                    // Close dropdown
                    wrapper.classList.remove('open');
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-wrapper')) {
                document.querySelectorAll('.dropdown-wrapper').forEach(w => w.classList.remove('open'));
            }
        });

        // Property controls
        const strokeColorEl = document.getElementById('strokeColor');
        if (strokeColorEl) {
            strokeColorEl.addEventListener('change', (e) => {
                this.properties.strokeColor = e.target.value;
                window.canvasManager?.applyPropertyToSelection('stroke', e.target.value);
            });
        }

        const fillColorEl = document.getElementById('fillColor');
        if (fillColorEl) {
            fillColorEl.addEventListener('change', (e) => {
                this.properties.fillColor = e.target.value;
                if (this.properties.fillEnabled) {
                    window.canvasManager?.applyPropertyToSelection('fill', e.target.value);
                }
            });
        }
        
        const fillEnabledEl = document.getElementById('fillEnabled');
        if (fillEnabledEl) {
            fillEnabledEl.addEventListener('change', (e) => {
                this.properties.fillEnabled = e.target.checked;
                if (e.target.checked) {
                    window.canvasManager?.applyPropertyToSelection('fill', this.properties.fillColor);
                } else {
                    window.canvasManager?.applyPropertyToSelection('fill', 'transparent');
                }
            });
        }

        const strokeWidthEl = document.getElementById('strokeWidth');
        if (strokeWidthEl) {
            strokeWidthEl.addEventListener('input', (e) => {
                this.properties.strokeWidth = parseInt(e.target.value);
                document.getElementById('widthDisplay').textContent = e.target.value + 'px';
                window.canvasManager?.applyPropertyToSelection('strokeWidth', parseInt(e.target.value));
            });
        }

        const opacityEl = document.getElementById('opacity');
        if (opacityEl) {
            opacityEl.addEventListener('input', (e) => {
                this.properties.opacity = parseFloat(e.target.value);
                document.getElementById('opacityDisplay').textContent = Math.round(e.target.value * 100) + '%';
                window.canvasManager?.applyPropertyToSelection('opacity', parseFloat(e.target.value));
            });
        }
        
        const strokeStyleEl = document.getElementById('strokeStyle');
        if (strokeStyleEl) {
            strokeStyleEl.addEventListener('change', (e) => {
                this.properties.strokeStyle = e.target.value;
                const dashArray = this.getStrokeDashArray(e.target.value);
                window.canvasManager?.applyPropertyToSelection('strokeDashArray', dashArray);
            });
        }
        
        const highlighterColorEl = document.getElementById('highlighterColor');
        if (highlighterColorEl) {
            highlighterColorEl.addEventListener('change', (e) => {
                this.properties.highlighterColor = e.target.value;
            });
        }
    }
    
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

    setTool(toolName) {
        this.currentTool = toolName;
        
        // Update canvas mode
        if (window.canvasManager) {
            window.canvasManager.setMode(toolName);
        }
        
        // Update UI
        this.updateToolUI(toolName);
    }
    
    updateToolUI(toolName) {
        // Remove active class from all tool buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to current tool button
        const activeBtn = document.querySelector(`.tool-btn[data-tool="${toolName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Check if tool is in a dropdown and activate that dropdown button
        document.querySelectorAll('.dropdown-item').forEach(item => {
            if (item.dataset.tool === toolName) {
                const wrapper = item.closest('.dropdown-wrapper');
                const toggleBtn = wrapper?.querySelector('.dropdown-toggle');
                if (toggleBtn) {
                    toggleBtn.classList.add('active');
                    // Update icon
                    const iconEl = item.querySelector('i:first-child');
                    const toggleIcon = toggleBtn.querySelector('i:first-child');
                    if (iconEl && toggleIcon) {
                        toggleIcon.className = iconEl.className;
                    }
                }
            }
        });
        
        // Update cursor
        this.updateCursor(toolName);
    }
    
    updateCursor(toolName) {
        const wrapper = document.querySelector('.canvas-wrapper');
        if (!wrapper) return;
        
        wrapper.className = 'canvas-wrapper';
        
        switch (toolName) {
            case 'pen':
            case 'brush':
            case 'highlighter':
                wrapper.classList.add('drawing-cursor');
                break;
            case 'eraser':
                wrapper.classList.add('eraser-cursor');
                break;
            case 'text':
                wrapper.classList.add('text-cursor');
                break;
            case 'select':
                wrapper.classList.add('select-cursor');
                break;
            default:
                wrapper.classList.add('crosshair-cursor');
                break;
        }
    }

    getCurrentTool() {
        return this.currentTool;
    }

    getProperties() {
        return { ...this.properties };
    }

    setProperty(key, value) {
        this.properties[key] = value;
    }
}
