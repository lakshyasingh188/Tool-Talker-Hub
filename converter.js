// Functionality relies on jspdf library linked in HTML
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
        // Check if file type is not available and infer from extension
        if (!uploadedFileType) {
             const extension = uploadedFile.name.split('.').pop().toLowerCase();
             if (extension === 'txt') {
                 uploadedFileType = 'text/plain';
             } else if (extension === 'docx' || extension === 'doc') {
                 // For unsupported files, we just allow the selection
                 uploadedFileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
             }
        }
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
        if (uploadedFileType.startsWith('image/') || uploadedFileType === 'text/plain') {
            // Only proceed if file type is supported for PDF conversion
            await convertToPDF(fileName);
            // Alert is inside the conversion function to ensure it runs only on success
        } else {
            // Alert for unsupported files like DOCX
            alert("माफ़ करें। PDF में कन्वर्ट करने के लिए केवल Image (JPG/PNG) या Text (TXT) फ़ाइलें ही समर्थित (supported) हैं। DOCX के लिए सर्वर की आवश्यकता होती है।");
            return;
        }
    } else if (targetFormat === 'TXT') {
        if (uploadedFileType === 'text/plain') {
             await convertToTXT(fileName);
        } else {
            alert("TXT में कन्वर्ट करने के लिए केवल TXT फ़ाइल ही समर्थित है।");
            return;
        }
    } else if (targetFormat === 'JPG' || targetFormat === 'PNG') {
        if (uploadedFileType.startsWith('image/')) {
            await convertImageToFormat(fileName, targetFormat);
        } else {
            alert("Image फ़ॉर्मेट में कन्वर्ट करने के लिए केवल Image फ़ाइल ही अपलोड करें।");
            return;
        }
    } else {
        alert("माफ़ करें, यह फ़ॉर्मेट अभी समर्थित (supported) नहीं है।");
        return;
    }
    
    // Final success alert is removed here and placed inside specific functions
}


// --- Conversion Functions (Focus on fixing PDF) ---

async function convertToPDF(fileName) {
    const reader = new FileReader();
    const { jsPDF } = window.jspdf; // Use window.jspdf for proper access
    
    if (uploadedFileType.startsWith('image/')) {
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const doc = new jsPDF('p', 'pt', 'a4');
                const a4Width = 595.28;
                const a4Height = 841.89;
                
                const scale = a4Width / img.width;
                const imgHeight = img.height * scale;
                
                let position = 0;
                let heightLeft = imgHeight;
                
                doc.addImage(img, 'JPEG', 0, position, a4Width, imgHeight);
                heightLeft -= a4Height;
                
                while (heightLeft > 0) { // Condition change to "> 0"
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(img, 'JPEG', 0, position, a4Width, imgHeight);
                    heightLeft -= a4Height;
                }
                
                doc.save(`${fileName}.pdf`);
                alert(`File सफलतापूर्वक PDF में Convert हो गया है और डाउनलोड हो गया है!`);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(uploadedFile);
    } 
    else if (uploadedFileType === 'text/plain') {
        reader.onload = function(e) {
            const textContent = e.target.result;
            const doc = new jsPDF(); // Use the object created from window.jspdf
            
            // Adjust text split size for clarity
            const lines = doc.splitTextToSize(textContent, 180); 
            doc.text(lines, 10, 10); 
            
            doc.save(`${fileName}.pdf`);
            alert(`File सफलतापूर्वक PDF में Convert हो गया है और डाउनलोड हो गया है!`);
        };
        reader.readAsText(uploadedFile);
    }
}

async function convertToTXT(fileName) {
    // Simply download the uploaded TXT file with a potentially new name
    const a = document.createElement('a');
    a.href = URL.createObjectURL(uploadedFile);
    a.download = `${fileName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    alert(`File सफलतापूर्वक TXT में Convert हो गया है और डाउनलोड हो गया है!`);
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

            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${fileName}.${extension}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                alert(`File सफलतापूर्वक ${targetFormat} में Convert हो गया है और डाउनलोड हो गया है!`);
            }, mimeType);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(uploadedFile);
}
