// Image editing functionality for Fabric.js
class ImageEditor {
    constructor() {
        this.currentImage = null;
        this.bindEvents();
    }

    bindEvents() {
        const imageUpload = document.getElementById('imageUpload');
        if (imageUpload) {
            imageUpload.addEventListener('change', this.handleImageUpload.bind(this));
        }
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        this.loadImage(file);
        
        // Reset file input
        event.target.value = '';
    }

    async loadImage(file) {
        try {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                fabric.Image.fromURL(e.target.result, (img) => {
                    const canvas = window.canvasManager?.canvas;
                    if (!canvas) return;
                    
                    // Scale image to fit canvas if too large
                    const maxWidth = canvas.width * 0.8;
                    const maxHeight = canvas.height * 0.8;
                    
                    let scale = 1;
                    if (img.width > maxWidth) {
                        scale = maxWidth / img.width;
                    }
                    if (img.height * scale > maxHeight) {
                        scale = maxHeight / img.height;
                    }
                    
                    img.set({
                        left: canvas.width / 2,
                        top: canvas.height / 2,
                        originX: 'center',
                        originY: 'center',
                        scaleX: scale,
                        scaleY: scale,
                        objectType: 'image'
                    });
                    
                    canvas.add(img);
                    canvas.setActiveObject(img);
                    canvas.requestRenderAll();
                    
                    this.currentImage = img;
                    window.historyManager?.saveState('Image added');
                    
                    console.log('Image loaded successfully');
                });
            };
            
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error loading image:', error);
            alert('Error loading image. Please try again.');
        }
    }

    // Apply filter to selected image
    applyFilter(filterType, value = 0.5) {
        const canvas = window.canvasManager?.canvas;
        const activeObject = canvas?.getActiveObject();
        
        if (!activeObject || activeObject.type !== 'image') {
            alert('Please select an image first.');
            return;
        }

        // Remove existing filter of same type
        activeObject.filters = activeObject.filters || [];
        
        let filter;
        
        switch (filterType) {
            case 'brightness':
                filter = new fabric.Image.filters.Brightness({ brightness: value });
                break;
            case 'contrast':
                filter = new fabric.Image.filters.Contrast({ contrast: value });
                break;
            case 'saturation':
                filter = new fabric.Image.filters.Saturation({ saturation: value });
                break;
            case 'blur':
                filter = new fabric.Image.filters.Blur({ blur: value });
                break;
            case 'grayscale':
                filter = new fabric.Image.filters.Grayscale();
                break;
            case 'sepia':
                filter = new fabric.Image.filters.Sepia();
                break;
            case 'invert':
                filter = new fabric.Image.filters.Invert();
                break;
            case 'sharpen':
                filter = new fabric.Image.filters.Convolute({
                    matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
                });
                break;
            case 'emboss':
                filter = new fabric.Image.filters.Convolute({
                    matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1]
                });
                break;
            case 'pixelate':
                filter = new fabric.Image.filters.Pixelate({ blocksize: Math.round(value * 20) + 2 });
                break;
            case 'noise':
                filter = new fabric.Image.filters.Noise({ noise: value * 500 });
                break;
            case 'remove':
                // Remove all filters
                activeObject.filters = [];
                activeObject.applyFilters();
                canvas.requestRenderAll();
                window.historyManager?.saveState('Filters removed');
                return;
            default:
                return;
        }

        if (filter) {
            activeObject.filters.push(filter);
            activeObject.applyFilters();
            canvas.requestRenderAll();
            window.historyManager?.saveState(`${filterType} filter applied`);
        }
    }

    // Crop image to selection
    cropImage() {
        const canvas = window.canvasManager?.canvas;
        const activeObject = canvas?.getActiveObject();
        
        if (!activeObject || activeObject.type !== 'image') {
            alert('Please select an image first.');
            return;
        }

        // For now, just provide instructions
        alert('To crop: Use the selection handles to resize the image, or use an external tool.');
    }

    // Rotate image
    rotateImage(degrees) {
        const canvas = window.canvasManager?.canvas;
        const activeObject = canvas?.getActiveObject();
        
        if (!activeObject) {
            alert('Please select an object first.');
            return;
        }

        const currentAngle = activeObject.angle || 0;
        activeObject.rotate(currentAngle + degrees);
        activeObject.setCoords();
        canvas.requestRenderAll();
        window.historyManager?.saveState(`Rotated ${degrees}°`);
    }

    // Flip image
    flipHorizontal() {
        const canvas = window.canvasManager?.canvas;
        const activeObject = canvas?.getActiveObject();
        
        if (!activeObject) {
            alert('Please select an object first.');
            return;
        }

        activeObject.set('flipX', !activeObject.flipX);
        canvas.requestRenderAll();
        window.historyManager?.saveState('Flipped horizontal');
    }

    flipVertical() {
        const canvas = window.canvasManager?.canvas;
        const activeObject = canvas?.getActiveObject();
        
        if (!activeObject) {
            alert('Please select an object first.');
            return;
        }

        activeObject.set('flipY', !activeObject.flipY);
        canvas.requestRenderAll();
        window.historyManager?.saveState('Flipped vertical');
    }

    // Reset image transformations
    resetTransformations() {
        const canvas = window.canvasManager?.canvas;
        const activeObject = canvas?.getActiveObject();
        
        if (!activeObject) {
            alert('Please select an object first.');
            return;
        }

        activeObject.set({
            angle: 0,
            flipX: false,
            flipY: false,
            scaleX: 1,
            scaleY: 1
        });
        activeObject.setCoords();
        canvas.requestRenderAll();
        window.historyManager?.saveState('Transformations reset');
    }

    // Add background image to canvas
    setAsBackground(imageUrl) {
        const canvas = window.canvasManager?.canvas;
        if (!canvas) return;

        fabric.Image.fromURL(imageUrl, (img) => {
            // Scale to cover canvas
            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            const scale = Math.max(scaleX, scaleY);
            
            img.set({
                scaleX: scale,
                scaleY: scale,
                originX: 'center',
                originY: 'center',
                left: canvas.width / 2,
                top: canvas.height / 2
            });
            
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
            window.historyManager?.saveState('Background image set');
        });
    }

    // Clear background
    clearBackground() {
        const canvas = window.canvasManager?.canvas;
        if (!canvas) return;

        canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
        canvas.backgroundColor = '#ffffff';
        canvas.renderAll();
        window.historyManager?.saveState('Background cleared');
    }
}
