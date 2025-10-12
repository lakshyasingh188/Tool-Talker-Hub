let originalImage = null;

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', previewImage);
});

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage = new Image();
            originalImage.onload = function() {
                // Display original dimensions and size
                const fileSizeKB = (file.size / 1024).toFixed(2);
                document.getElementById('originalDimensions').textContent = 
                    `Original Size: ${originalImage.width} x ${originalImage.height} px (${fileSizeKB} KB)`;
                    
                // Set default resize values 
                document.getElementById('widthInput').value = originalImage.width;
                document.getElementById('heightInput').value = originalImage.height;
                document.getElementById('qualityInput').value = 90; // Default high quality
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function resizeImage() {
    if (!originalImage) {
        alert("पहले एक Image अपलोड करें।");
        return;
    }
    
    // 1. Get user inputs
    const newWidth = parseInt(document.getElementById('widthInput').value);
    const newHeight = parseInt(document.getElementById('heightInput').value);
    const format = document.getElementById('formatSelect').value;
    const qualityPercent = parseInt(document.getElementById('qualityInput').value);
    
    // Calculate quality as a decimal (0.0 to 1.0)
    const quality = format === 'image/jpeg' ? (qualityPercent / 100) : 1.0; 

    if (isNaN(newWidth) || isNaN(newHeight) || newWidth < 10 || newHeight < 10) {
        alert("Width और Height के सही मान (value) भरें (न्यूनतम 10px)।");
        return;
    }
    
    if (format === 'image/jpeg' && (isNaN(qualityPercent) || qualityPercent < 1 || qualityPercent > 100)) {
        alert("JPG Quality 1% से 100% के बीच होनी चाहिए।");
        return;
    }

    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    
    // 2. Resize Canvas
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

    // 3. Download using Blob
    canvas.toBlob(function(blob) {
        if (!blob) {
            alert("Image बनाने में कोई समस्या आई। फ़ाइल टाइप जाँचें।");
            return;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const extension = format === 'image/jpeg' ? 'jpg' : 'png';
        
        a.href = url;
        a.download = `resized_image_${newWidth}x${newHeight}_${qualityPercent || 100}.${extension}`; 
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        const finalSizeKB = (blob.size / 1024).toFixed(2);
        alert(`Image सफलतापूर्वक Resize/Compress हो गया है।\nफाइनल साइज़: ${finalSizeKB} KB\n(पुराना साइज़: ${(originalImage.size / 1024).toFixed(2)} KB)`);
        
    }, format, quality); // Pass format and quality here
}
