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
    const inputFormDiv = document.querySelector('.input-form');
    const customizationPanel = document.querySelector('.customization-panel');

    let currentTemplate = 'hindu-beige';

    // --- 0. INITIAL SETUP & TEMPLATE LOGIC ---

    // Default photo placeholder (Updated to match CSS)
    biodataPhoto.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="220" viewBox="0 0 180 220"><rect width="180" height="220" fill="#e0e0e0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#666666">Profile Photo</text></svg>';
    outputDiv.style.display = 'block'; // Start by showing the preview area

    // Function to apply template styles and logic
    function applyTemplate(template, forceAccent = null, forceBg = null) {
        currentTemplate = template;

        // Reset all template cards
        templateCards.forEach(card => card.classList.remove('selected'));

        let selectedCard = document.querySelector(`.template-card[data-template="${template}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            
            // Set colors based on template or forced values
            const accent = forceAccent || selectedCard.dataset.accent;
            const bg = forceBg || selectedCard.dataset.bg;
            
            rootStyles.setProperty('--template-bg', bg);
            rootStyles.setProperty('--template-accent', accent);
            
            // Update dropdowns only if not explicitly setting colors
            if (!forceAccent) accentColorSelect.value = accent;
            if (!forceBg) backgroundColorSelect.value = bg;
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
            hinduSpecificFields.forEach(field => field.style.display = 'block'); // Default to showing if unknown
        }
        
        // Re-generate biodata preview after changing template
        updateBiodata();
    }

    // Event listeners for template cards (Preview Click)
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            // Preserve current accent/bg if already customised via dropdowns
            const currentAccent = accentColorSelect.value;
            const currentBg = backgroundColorSelect.value;
            applyTemplate(card.dataset.template, currentAccent, currentBg);
        });
    });

    // Event listener for accent color dropdown
    accentColorSelect.addEventListener('change', (e) => {
        rootStyles.setProperty('--template-accent', e.target.value);
    });

    // Event listener for background color dropdown
    backgroundColorSelect.addEventListener('change', (e) => {
        rootStyles.setProperty('--template-bg', e.target.value);
    });

    // Apply default template on load
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
            // If file is cleared, revert to placeholder
            biodataPhoto.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="220" viewBox="0 0 180 220"><rect width="180" height="220" fill="#e0e0e0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#666666">Profile Photo</text></svg>';
        }
    });

    // --- 2. REAL-TIME BIODATA GENERATOR FUNCTION ---
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

        // Helper function to create a detail row ONLY if the value is not empty
        const createDetailRow = (label, value) => {
            const trimmedValue = value.trim();
            if (trimmedValue) {
                return `<div class="detail-row"><span>${label}</span><span>: ${trimmedValue.replace(/\n/g, '<br>')}</span></div>`;
            }
            return '';
        };

        // Format Date and Time (Only if DOB is present)
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
                // Keep raw value if formatting fails
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
    };

    // Event listener for all form elements to trigger real-time update
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updateBiodata);
        input.addEventListener('change', updateBiodata); // For select/file inputs
    });
    
    // Initial call to populate the preview
    updateBiodata(); 

    // --- 3. GENERATE BIODATA BUTTON LOGIC ---
    generateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Hide input area and show download button
        inputFormDiv.style.display = 'none';
        customizationPanel.style.display = 'none';
        generateBtn.style.display = 'none';
        downloadBtn.style.display = 'inline-block';
        
        // Ensure the final data is rendered
        updateBiodata();
    });

    // --- 4. DOWNLOAD FUNCTIONALITY with html2pdf.js ---
    downloadBtn.addEventListener('click', () => {
        // Temporarily hide the download button to prevent it from appearing in the PDF
        downloadBtn.style.display = 'none';
        
        const element = document.getElementById('biodata-output');
        const opt = {
            margin: 10, // Margin in mm
            filename: 'Marriage_Biodata.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: true }, // useCORS is crucial for uploaded images
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Use html2pdf to generate and save the PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Re-show the download button after the PDF is saved
            downloadBtn.style.display = 'inline-block';
        }).catch(error => {
            // Re-show button even if error occurs
            downloadBtn.style.display = 'inline-block';
            console.error("PDF generation failed:", error);
            alert("PDF जनरेट करने में कोई समस्या आई है। (यदि आपने फोटो अपलोड की है, तो उसे हटाकर फिर से प्रयास करें क्योंकि यह CORS की समस्या हो सकती है।)");
        });
    });
});
});
