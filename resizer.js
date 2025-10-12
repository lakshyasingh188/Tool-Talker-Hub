document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', previewImage);
});

let originalImage = null;

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage = new Image();
            originalImage.onload = function() {
                // Set initial values to original dimensions
                document.getElementById('widthInput').value = originalImage.width;
                document.getElementById('heightInput').value = originalImage.height;
                alert(`Image loaded: ${originalImage.width}x${originalImage.height}`);
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function resizeImage() {
    if (!originalImage) {
        alert("Please upload an image first.");
        return;
    }
    
    const newWidth = parseInt(document.getElementById('widthInput').value);
    const newHeight = parseInt(document.getElementById('heightInput').value);

    if (isNaN(newWidth) || isNaN(newHeight) || newWidth <= 0 || newHeight <= 0) {
        alert("Please enter valid width and height values.");
        return;
    }

    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to new dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    // Draw the image onto the canvas, resizing it
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

    // Get the resized image data (as PNG for general quality)
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resized_image_${newWidth}x${newHeight}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 'image/png');
    
    alert(`Image successfully resized to ${newWidth}x${newHeight} and downloaded!`);
}
