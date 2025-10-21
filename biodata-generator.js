document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('biodata-form');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const outputDiv = document.getElementById('biodata-output');
    const biodataPhoto = document.getElementById('biodata-photo');

    // Default photo to avoid broken image initially
    biodataPhoto.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="220" viewBox="0 0 180 220"><rect width="180" height="220" fill="#cccccc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#666666">Upload Photo</text></svg>';


    // --- 1. HANDLE IMAGE UPLOAD ---
    document.getElementById('biodata-image').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                biodataPhoto.src = e.target.result;
            };
            reader.readAsDataURL(file);
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

        // Format Date of Birth
        let formattedDOB = "N/A";
        let formattedTime = "";
        try {
            const dt = new Date(data.dob);
            // Example: 01/03/1990, 11:05 PM
            formattedDOB = dt.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            formattedTime = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        } catch (e) {
            // Use raw value if date parsing fails
            formattedDOB = data.dob;
        }


        // --- Personal Details Output ---
        const personalDetailsHTML = `
            <div class="detail-row"><span>Full Name</span><span>: ${data.fullName}</span></div>
            <div class="detail-row"><span>Date of Birth</span><span>: ${formattedDOB}, ${formattedTime}</span></div>
            <div class="detail-row"><span>Height</span><span>: ${data.height}</span></div>
            <div class="detail-row"><span>Place of Birth</span><span>: ${data.placeOfBirth}</span></div>
            <div class="detail-row"><span>Religious</span><span>: ${data.religious}</span></div>
            <div class="detail-row"><span>Caste</span><span>: ${data.caste}</span></div>
            <div class="detail-row"><span>Rashi</span><span>: ${data.rashi}</span></div>
            <div class="detail-row"><span>Nakshatra</span><span>: ${data.nakshatra}</span></div>
            <div class="detail-row"><span>Manglik</span><span>: ${data.manglik}</span></div>
            <div class="detail-row"><span>Gotra</span><span>: ${data.gotra}</span></div>
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
        downloadBtn.style.display = 'inline-block';
        document.querySelector('.input-form').style.display = 'none'; // Hide form after generation
        generateBtn.style.display = 'none'; // Hide generate button
    });

    // --- 3. DOWNLOAD/PRINT FUNCTIONALITY ---
    downloadBtn.addEventListener('click', () => {
        // Simple print command for PDF generation (most modern browsers support this)
        window.print();
    });
});
