// Functionality relies on jspdf and html2canvas libraries linked in HTML
let uploadedFile = null;
let uploadedFileType = '';

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', loadFile);
});

function loadFile(event) {
    uploadedFile = event.target.files[0];
    if (uploadedFile) {
        uploadedFileType = uploadedFile.type;
        alert(`File loaded: ${uploadedFile.name} (${uploadedFileType})`);
    }
}

async function universalConvert() {
    if (!uploadedFile) {
        alert("पहले एक File अपलोड करें।");
        return;
    }
    
    const targetFormat = document.getElementById('formatSelect').value;
    const fileName = uploadedFile.name.substring(0, uploadedFile.name.lastIndexOf('.')) || 'converted_file';
    
    if (targetFormat === 'PDF') {
        await convertToPDF(fileName);
    } else if (targetFormat === 'TXT') {
        await convertToTXT(fileName);
    } else if (uploadedFileType.startsWith('image/')) {
        await convertImageToFormat(fileName, targetFormat);
    } else {
        alert("माफ़ करें, यह फ़ॉर्मेट अभी समर्थित (supported) नहीं है।");
        return;
    }
    
    alert(`File सफलतापूर्वक ${targetFormat} में Convert हो गया है और डाउनलोड हो गया है!`);
}


// --- Conversion Functions ---

async function convertToPDF(fileName) {
    const reader = new FileReader();
    
    if (uploadedFileType.startsWith('image/')) {
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                // Initialize jsPDF
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('p', 'pt', 'a4');
                const a4Width = 595.28;
                const a4Height = 841.89;
                
                // Calculate scale to fit width
                const scale = a4Width / img.width;
                const imgHeight = img.height * scale;
                
                let position = 0;
                let heightLeft = imgHeight;
                
                // Add the image, creating new pages if necessary
                doc.addImage(img, 'JPEG', 0, position, a4Width, imgHeight);
                heightLeft -= a4Height;
                
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(img, 'JPEG', 0, position, a4Width, imgHeight);
                    heightLeft -= a4Height;
                }
                
                doc.save(`${fileName}.pdf`);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(uploadedFile);
    } 
    else if (uploadedFileType === 'text/plain') {
        reader.onload = function(e) {
            const textContent = e.target.result;
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            const lines = doc.splitTextToSize(textContent, 180); // 180mm width
            doc.text(lines, 10, 10); // Start at 10mm from top/left
            
            doc.save(`${fileName}.pdf`);
        };
        reader.readAsText(uploadedFile);
    }
    // DOCX to PDF and other complex conversions require server-side code, which is not possible here.
}

async function convertToTXT(fileName) {
    if (uploadedFileType === 'text/plain') {
        // If it's already a text file, just save it with a new name (no conversion needed)
        const a = document.createElement('a');
        a.href = URL.createObjectURL(uploadedFile);
        a.download = `${fileName}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    } else {
        alert("TXT में कन्वर्ट करने के लिए केवल TXT फ़ाइल ही अपलोड करें।");
    }
}

async function convertImageToFormat(fileName, targetFormat) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let mimeType;
            let extension = targetFormat.toLowerCase();
            if (targetFormat === 'JPG') mimeType = 'image/jpeg';
            else if (targetFormat === 'PNG') mimeType = 'image/png';
            else if (targetFormat === 'WEBP') mimeType = 'image/webp'; // Add WEBP option if needed

            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${fileName}.${extension}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, mimeType);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(uploadedFile);
}
