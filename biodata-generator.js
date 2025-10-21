document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('biodata-form');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const outputDiv = document.getElementById('biodata-output');
    const biodataPhoto = document.getElementById('biodata-photo');
    const templateCards = document.querySelectorAll('.template-card');
    const accentColorSelect = document.getElementById('accent-color-select');
    const ganeshaIcon = document.getElementById('ganesha-icon');
    const biodataMantra = document.getElementById('biodata-mantra');
    const rootStyles = document.documentElement.style;
    const hinduSpecificFields = document.querySelectorAll('.hindu-specific');

    let currentTemplate = 'hindu-beige'; 

    // --- 0. INITIAL SETUP & TEMPLATE LOGIC ---
    
    // Default photo placeholder (To prevent broken image icon)
    biodataPhoto.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="220" viewBox="0 0 180 220"><rect width="180" height="220" fill="#cccccc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#666666">Profile Photo</text></svg>';

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
        }


        if (template === 'hindu-beige') {
            ganeshaIcon.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Lord_Ganesha.svg/100px-Lord_Ganesha.svg.png";
            ganeshaIcon.style.display = 'block';
            biodataMantra.textContent = '॥ श्री गणेशाय नमः ॥';
            
            // Show Hindu-specific fields
            hinduSpecificFields.forEach(field => field.style.display = 'block');

        } else if (template.startsWith('muslim')) {
            ganeshaIcon.style.display = 'none'; // Hide Ganesha icon
            biodataMantra.textContent = 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'; // Bismillah
            
            // Hide Hindu-specific fields
            hinduSpecificFields.forEach(field => field.style.display = 'none');
        }
    }

    // Event listeners for template cards (Preview Click)
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            applyTemplate(card.dataset.template);
        });
    });

    // Event listener for accent color dropdown (Only updates accent, not template logic)
    accentColorSelect.addEventListener('change', (e) => {
        rootStyles.setProperty('--template-accent', e.target.value);
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
            biodataPhoto.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="220" viewBox="0 0 180 220"><rect width="180" height="220" fill="#cccccc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#666666">Profile Photo</text></svg>';
        }
    });

    // --- 2. GENERATE BIODATA ---
    generateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

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

        // Format Date and Time
        let formattedDOB = "N/A";
        let formattedTime = "";
        try {
            const dt = new Date(data.dob);
            formattedDOB = dt.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            formattedTime = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        } catch (e) {
            formattedDOB = data.dob;
        }

        // --- Personal Details Output ---
        let personalDetailsHTML = `
            <div class="detail-row"><span>Full Name</span><span>: ${data.fullName}</span></div>
            <div class="detail-row"><span>Date of Birth & Time</span><span>: ${formattedDOB}, ${formattedTime}</span></div>
            <div class="detail-row"><span>Height</span><span>: ${data.height}</span></div>
            <div class="detail-row"><span>Place of Birth</span><span>: ${data.placeOfBirth}</span></div>
            <div class="detail-row"><span>Religious</span><span>: ${data.religious}</span></div>
            <div class="detail-row"><span>Caste/Community</span><span>: ${data.caste}</span></div>
        `;
        
        if (currentTemplate === 'hindu-beige') {
             personalDetailsHTML += `
                <div class="detail-row"><span>Rashi</span><span>: ${data.rashi}</span></div>
                <div class="detail-row"><span>Nakshatra</span><span>: ${data.nakshatra}</span></div>
                <div class="detail-row"><span>Manglik</span><span>: ${data.manglik}</span></div>
                <div class="detail-row"><span>Gotra</span><span>: ${data.gotra}</span></div>
             `;
        }

        personalDetailsHTML += `
            <div class="detail-row"><span>Complexion</span><span>: ${data.complexion}</span></div>
            <div class="detail-row"><span>Blood Group</span><span>: ${data.bloodGroup}</span></div>
            <div class="detail-row"><span>Higher Education</span><span>: ${data.education}</span></div>
            <div class="detail-row"><span>Job/Occupation</span><span>: ${data.job}</span></div>
        `;

        document.getElementById('personal-details-output').innerHTML = personalDetailsHTML;

        // --- Family Details Output ---
        const familyDetailsHTML = `
            <div class="detail-row"><span>Father's Name</span><span>: ${data.fatherName}</span></div>
            <div class="detail-row"><span>Mother's Name</span><span>: ${data.motherName}</span></div>
            <div class="detail-row"><span>Siblings (Brother/Sister)</span><span>: ${data.siblings}</span></div>
        `;
        document.getElementById('family-details-output').innerHTML = familyDetailsHTML;

        // --- Contact Details Output ---
        const contactDetailsHTML = `
            <div class="detail-row"><span>Current Address</span><span>: ${data.address.replace(/\n/g, '<br>')}</span></div>
            <div class="detail-row"><span>Contact No.</span><span>: ${data.contactNo}</span></div>
        `;
        document.getElementById('contact-details-output').innerHTML = contactDetailsHTML;


        // Show output and Download button
        outputDiv.style.display = 'block';
        downloadBtn.style.display = 'inline-block'; // <<<--- This line ensures the button is visible
        
        // Hide input fields
        document.querySelector('.input-form').style.display = 'none'; 
        generateBtn.style.display = 'none'; 
        document.querySelector('.customization-panel').style.display = 'none'; 
    });

    // --- 3. DOWNLOAD FUNCTIONALITY with html2pdf.js ---
    downloadBtn.addEventListener('click', () => {
        const element = document.getElementById('biodata-output');
        const opt = {
            margin:       10,
            filename:     'Marriage_Biodata.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true }, // useCORS is critical for Ganesha image and photo
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Use html2pdf to generate and save the PDF
        html2pdf().set(opt).from(element).save();
    });
});
