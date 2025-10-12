let imageToConvert = null;

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('convertImageInput');
    imageInput.addEventListener('change', loadConvertImage);
});

function loadConvertImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageToConvert = new Image();
            imageToConvert.src = e.target.result;
            imageToConvert.onload = () => {
                console.log(`Image loaded: ${file.name}`);
                alert(`Image loaded: ${file.name}`);
            }
        };
        reader.readAsDataURL(file);
    }
}

function convertImage() {
    if (!imageToConvert) {
        alert("पहले एक Image अपलोड करें।");
        return;
    }
    
    const formatSelect = document.getElementById('formatSelect');
    const targetMimeType = formatSelect.value;
    const targetExtension = formatSelect.options[formatSelect.selectedIndex].text.toLowerCase();

    const canvas = document.getElementById('convertCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to the original image dimensions
    canvas.width = imageToConvert.width;
    canvas.height = imageToConvert.height;
    
    // Draw the original image onto the canvas
    ctx.drawImage(imageToConvert, 0, 0);

    // Get the converted image data
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted_image.${targetExtension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, targetMimeType);
    
    alert(`Image सफलतापूर्वक ${targetExtension} में Convert हो गया है और डाउनलोड हो गया है!`);
}
