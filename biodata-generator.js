document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('biodata-form');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const outputDiv = document.getElementById('biodata-output');
    const biodataPhoto = document.getElementById('biodata-photo');
    const templateCards = document.querySelectorAll('.template-card'); 
    const accentColorSelect = document.getElementById('accent-color-select');
    const backgroundColorSelect = document.getElementById('background-color-select');
    const biodataMantra = document.getElementById('biodata-mantra');
    const rootStyles = document.documentElement.style;
    const hinduSpecificFields = document.querySelectorAll('.hindu-specific');
    
    // इनपुट एरिया को सही ढंग से सिलेक्ट करना महत्वपूर्ण है
    const inputAreaDiv = document.querySelector('.input-area'); 
    const containerDiv = document.querySelector('.container');

    let currentTemplate = 'hindu-beige';

    // --- 0. INITIAL SETUP & TEMPLATE LOGIC ---

    const defaultPlaceholderSVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="220" viewBox="0 0 180 220"><rect width="180" height="220" fill="#e0e0e0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#666666">Profile Photo</text></svg>';
    biodataPhoto.src = defaultPlaceholderSVG;
    outputDiv.style.display = 'block';

    function applyTemplate(template) {
        currentTemplate = template;
        templateCards.forEach(card => card.classList.remove('selected'));
        let selectedCard = document.querySelector(`.template-card[data-template="${template}"]`);
        
        if (selectedCard) {
            selectedCard.classList.add('selected');
            const accent = selectedCard.dataset.accent;
            const bg = selectedCard.dataset.bg;
            rootStyles.setProperty('--template-bg', bg);
            rootStyles.setProperty('--template-accent', accent);
            accentColorSelect.value = accent;
            backgroundColorSelect.value = bg;
        }

        if (template === 'hindu-beige') {
            biodataMantra.textContent = '॥ श्री गणेशाय नमः ॥';
            hinduSpecificFields.forEach(field => field.style.display = 'grid'); 
        } else if (template.startsWith('muslim')) {
            biodataMantra.textContent = 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
            hinduSpecificFields.forEach(field => field.style.display = 'none'); 
        } else {
            biodataMantra.textContent = '॥ BIODATA ॥';
            hinduSpecificFields.forEach(field => field.style.display = 'grid');
        }
        updateBiodata();
    }

    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            applyTemplate(card.dataset.template);
        });
    });

    accentColorSelect.addEventListener('change', (e) => {
        rootStyles.setProperty('--template-accent', e.target.value);
        updateBiodata(); 
    });

    backgroundColorSelect.addEventListener('change', (e) => {
        rootStyles.setProperty('--template-bg', e.target.value);
        updateBiodata(); 
    });

    applyTemplate(currentTemplate);

    // --- 1. HANDLE IMAGE UPLOAD ---
    document.getElementById('biodata-image').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                biodataPhoto.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            biodataPhoto.src = defaultPlaceholderSVG;
        }
    });

    // --- 2. REAL-TIME BIODATA GENERATOR FUNCTION (Used by all input changes) ---
    const updateBiodata = () => {
        const data = {
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
        };

        const createDetailRow = (label, value) => {
            const trimmedValue = (value || '').trim();
            if (trimmedValue && trimmedValue !== 'Select') { 
                if (label === 'Contact No.') {
                    return `<div class="detail-row"><span>${label}</span><span>: <a href="tel:${trimmedValue}" style="text-decoration:none; color:inherit;">${trimmedValue}</a></span></div>`;
                }
                return `<div class="detail-row"><span>${label}</span><span>: ${trimmedValue.replace(/\n/g, '<br>')}</span></div>`;
            }
            return '';
        };

        let dobRow = '';
        const dobValue = data.dob.trim();
        if (dobValue) {
            let formattedDOB = dobValue;
            let formattedTime = "";
            try {
                const dt = new Date(dobValue);
                if (!isNaN(dt.getTime())) { 
                    formattedDOB = dt.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    formattedTime = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                }
            } catch (e) { /* silent fail */ }
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

        // Check the current display style in the DOM to know if these fields should be included in the output
        if (document.querySelector('.hindu-specific').style.display !== 'none') {
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
    };

    // Event listener for all form elements to trigger real-time update
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updateBiodata);
        input.addEventListener('change', updateBiodata); 
    });
    
    updateBiodata(); 

    // --- 3. GENERATE BIODATA BUTTON LOGIC (Finalize View) ---
    generateBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        // 1. Ensure the preview is fully updated with latest data
        updateBiodata(); 
        
        // 2. Hide the input area
        inputAreaDiv.style.display = 'none'; 
        
        // 3. Hide the generate button and SHOW the download button
        generateBtn.style.display = 'none';
        downloadBtn.style.display = 'inline-block';
        
        // 4. Center the A4 output for better final viewing
        containerDiv.style.justifyContent = 'center';
        containerDiv.style.maxWidth = '900px'; 
    });

    // --- 4. DOWNLOAD FUNCTIONALITY with html2pdf.js (FIXED) ---
    downloadBtn.addEventListener('click', () => {
        // Temporarily hide the download button
        downloadBtn.style.display = 'none';
        
        const element = document.getElementById('biodata-output');
        const opt = {
            margin: 10, 
            filename: 'Marriage_Biodata.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, logging: true }, 
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
        };

        // Use html2pdf to generate and save the PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Re-show the download button after the PDF is saved
            downloadBtn.style.display = 'inline-block';
        }).catch(error => {
            downloadBtn.style.display = 'inline-block';
            console.error("PDF generation failed:", error);
            alert("PDF जनरेट करने में कोई समस्या आई है। कृपया कंसोल (Console) जाँचें।");
        });
    });
});
