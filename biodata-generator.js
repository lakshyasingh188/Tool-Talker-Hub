document.addEventListener('DOMContentLoaded', () => {
    // Buttons and Outputs
    const form = document.getElementById('biodata-form');
    const generateBtn = document.getElementById('generate-btn'); // अब यह इस्तेमाल नहीं होगा (hidden in CSS)
    const downloadBtn = document.getElementById('download-btn');
    const biodataPhoto = document.getElementById('biodata-photo');
    
    // Customization Elements
    const templateCards = document.querySelectorAll('.template-card');
    const accentColorSelect = document.getElementById('accent-color-select');
    const backgroundColorSelect = document.getElementById('background-color-select'); 
    const biodataMantra = document.getElementById('biodata-mantra');
    
    // Style and Logic
    const rootStyles = document.documentElement.style;
    const hinduSpecificFields = document.querySelectorAll('.hindu-specific');
    // सभी इनपुट फील्ड्स को ट्रैक करने के लिए
    const allInputFields = form.querySelectorAll('input, select, textarea');

    let currentTemplate = 'hindu-beige'; 

    // --- 0. INITIAL SETUP & TEMPLATE LOGIC ---
    
    // Default photo placeholder 
    biodataPhoto.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="220" viewBox="0 0 180 220"><rect width="180" height="220" fill="#cccccc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#666666">Profile Photo</text></svg>';

    // Helper function to create a detail row ONLY if the value is not empty
    const createDetailRow = (label, value) => {
        const trimmedValue = value ? value.trim() : '';
        if (trimmedValue) {
            return `<div class="detail-row"><span>${label}</span><span>: ${trimmedValue.replace(/\n/g, '<br>')}</span></div>`;
        }
        return '';
    };

    // Helper to get all current data from form
    const getFormData = () => ({
        fullName: document.getElementById('full-name').value,
        dob: document.getElementById('dob').value,
        height: document.getElementById('height').value,
        placeOfBirth: document.getElementById('place-of-birth').value,
        religious: document.getElementById('religious').value,
        caste: document.getElementById('caste').value,
        rashi: document.getElementById('rashi').value,
        nakshatra: document.getElementById('nakshatra').value,
        manglik: document.getElementById('manglik').value,
        gotra: document.getElementById('gotra').value,
        complexion: document.getElementById('complexion').value,
        bloodGroup: document.getElementById('blood-group').value,
        education: document.getElementById('education').value,
        job: document.getElementById('job').value,
        fatherName: document.getElementById('father-name').value,
        motherName: document.getElementById('mother-name').value,
        siblings: document.getElementById('siblings').value,
        address: document.getElementById('address').value,
        contactNo: document.getElementById('contact-no').value,
    });

    // Main function to render/update the biodata preview
    function renderBiodataPreview() {
        const data = getFormData();
        
        // --- Date of Birth Formatting ---
        let dobRow = '';
        const dobValue = data.dob.trim();
        if (dobValue) {
            let formattedDOB = dobValue;
            let formattedTime = "";
            try {
                const dt = new Date(dobValue);
                if (!isNaN(dt)) {
                    formattedDOB = dt.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    formattedTime = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                }
            } catch (e) {
                // Formatting fails
            }
            dobRow = `<div class="detail-row"><span>Date of Birth & Time</span><span>: ${formattedDOB}${formattedTime ? `, ${formattedTime}` : ''}</span></div>`;
        }
        
        // --- Personal Details Output ---
        let personalDetailsHTML = `
            ${createDetailRow('Full Name', data.fullName)}
            ${dobRow}
            ${createDetailRow('Height', data.height)}
            ${createDetailRow('Place of Birth', data.placeOfBirth)}
            ${createDetailRow('Religious', data.religious)}
            ${createDetailRow('Caste/Community', data.caste)}
        `;
        
        // Add Hindu-specific details only if the template is 'hindu-beige'
        if (currentTemplate === 'hindu-beige') {
             personalDetailsHTML += `
                ${createDetailRow('Rashi', data.rashi)}
                ${createDetailRow('Nakshatra', data.nakshatra)}
                ${createDetailRow('Manglik', data.manglik)}
                ${createDetailRow('Gotra', data.gotra)}
            `;
        }

        personalDetailsHTML += `
            ${createDetailRow('Complexion', data.complexion)}
            ${createDetailRow('Blood Group', data.bloodGroup)}
            ${createDetailRow('Higher Education', data.education)}
            ${createDetailRow('Job/Occupation', data.job)}
        `;

        document.getElementById('personal-details-output').innerHTML = personalDetailsHTML;

        // --- Family Details Output ---
        const familyDetailsHTML = `
            ${createDetailRow("Father's Name", data.fatherName)}
            ${createDetailRow("Mother's Name", data.motherName)}
            ${createDetailRow('Siblings (Brother/Sister)', data.siblings)}
        `;
        document.getElementById('family-details-output').innerHTML = familyDetailsHTML;

        // --- Contact Details Output ---
        const contactDetailsHTML = `
            ${createDetailRow('Current Address', data.address)}
            ${createDetailRow('Contact No.', data.contactNo)}
        `;
        document.getElementById('contact-details-output').innerHTML = contactDetailsHTML;
        
        // The Download button is always visible now as per CSS/HTML
    }


    // Function to apply template styles and logic
    function applyTemplate(template) {
        currentTemplate = template;

        // Reset all template cards
        templateCards.forEach(card => card.classList.remove('selected'));

        let selectedCard = document.querySelector(`.template-card[data-template="${template}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            rootStyles.setProperty('--template-bg', selectedCard.dataset.bg);
            rootStyles.setProperty('--template-accent', selectedCard.dataset.accent);
            accentColorSelect.value = selectedCard.dataset.accent; 
            backgroundColorSelect.value = selectedCard.dataset.bg; 
        }

        // Set Mantra and decide on field visibility
        if (template === 'hindu-beige') {
            biodataMantra.textContent = '॥ श्री गणेशाय नमः ॥';
            hinduSpecificFields.forEach(field => field.style.display = 'block');
        } else if (template.startsWith('muslim')) {
            biodataMantra.textContent = 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
            hinduSpecificFields.forEach(field => field.style.display = 'none');
        } else {
            biodataMantra.textContent = '॥ BIODATA ॥';
        }
        
        // Re-render preview to apply conditional fields (Rashi, Gotra, etc.)
        renderBiodataPreview();
    }

    // --- A. Event Listeners for Customization (Templates and Colors) ---
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            applyTemplate(card.dataset.template);
        });
    });

    accentColorSelect.addEventListener('change', (e) => {
        rootStyles.setProperty('--template-accent', e.target.value);
        renderBiodataPreview(); // Re-render to update the look
    });

    backgroundColorSelect.addEventListener('change', (e) => {
        rootStyles.setProperty('--template-bg', e.target.value);
        renderBiodataPreview(); // Re-render to update the look
    });
    
    // --- B. Event Listeners for Real-Time Input Update ---
    allInputFields.forEach(field => {
        field.addEventListener('input', renderBiodataPreview);
        field.addEventListener('change', renderBiodataPreview);
    });

    // --- C. Handle Image Upload ---
    document.getElementById('biodata-image').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                biodataPhoto.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            biodataPhoto.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="220" viewBox="0 0 180 220"><rect width="180" height="220" fill="#cccccc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#666666">Profile Photo</text></svg>';
        }
    });

    // --- D. DOWNLOAD FUNCTIONALITY with html2pdf.js ---
    downloadBtn.addEventListener('click', () => {
        // PDF जनरेट करने से पहले नवीनतम प्रीव्यू रेंडर करें
        renderBiodataPreview(); 
        
        // डाउनलोड बटन को अस्थायी रूप से छिपाएँ ताकि वह PDF में न दिखे
        downloadBtn.style.display = 'none';
        
        const element = document.getElementById('biodata-output');
        const opt = {
            margin:       10, // Margin in mm
            filename:     'Marriage_Biodata.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: true }, // useCORS is crucial for uploaded images
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Use html2pdf to generate and save the PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // PDF सेव होने के बाद डाउनलोड बटन को फिर से दिखाएँ
            downloadBtn.style.display = 'inline-block';
        }).catch(error => {
            // Error होने पर भी बटन को फिर से दिखाएँ
            downloadBtn.style.display = 'inline-block';
            console.error("PDF generation failed:", error);
            alert("PDF जनरेट करने में कोई समस्या आई है। (यदि आपने फोटो अपलोड की है, तो उसे हटाकर फिर से प्रयास करें क्योंकि यह CORS की समस्या हो सकती है।)"); 
        });
    });

    // Apply default template and render initial preview on load
    applyTemplate(currentTemplate);
    renderBiodataPreview();
});
