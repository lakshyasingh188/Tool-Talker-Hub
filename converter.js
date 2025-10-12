document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('convertImageInput');
    imageInput.addEventListener('change', loadConvertImage);
});

let imageToConvert = null;

function loadConvertImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageToConvert = new Image();
            imageToConvert.src = e.target.result;
            imageToConvert.onload = () => {
                alert(`Image loaded: ${file.name}`);
            }
        };
        reader.readAsDataURL(file);
    }
}

function convertImage() {
    if (!imageToConvert) {
        alert("Please upload an image first.");
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
    
    alert(`Image successfully converted to ${targetExtension} and downloaded!`);
}
