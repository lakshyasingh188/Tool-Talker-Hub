/**
 * यह फ़ंक्शन फ़ॉर्म से डेटा लेता है और CV को लाइव अपडेट करता है।
 */
function updateCV() {
    // 1. व्यक्तिगत विवरण
    const name = document.getElementById('nameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();
    const summary = document.getElementById('summaryInput').value.trim();

    // नाम और सारांश
    document.getElementById('cv-name').innerText = name;
    document.getElementById('cv-summary').innerText = summary;
    
    // 2. प्रोफ़ाइल फ़ोटो और इनिशियल्स
    const photoDisplay = document.getElementById('photo-display');
    const initialsDisplay = document.getElementById('initials-display');

    let initials = '';
    if (name) {
        const parts = name.split(' ');
        initials = parts.map(p => p.charAt(0).toUpperCase()).join('');
    }
    initialsDisplay.innerText = initials;

    const photoInput = document.getElementById('photoInput');
    const hasPhoto = photoInput.files && photoInput.files[0];

    if (hasPhoto) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoDisplay.src = e.target.result;
            photoDisplay.style.display = 'block';
            initialsDisplay.style.display = 'none';
        }
        reader.readAsDataURL(photoInput.files[0]);
    } else if (name) {
        photoDisplay.style.display = 'none';
        initialsDisplay.style.display = 'flex'; // इनिशियल्स दिखें
    } else {
        photoDisplay.style.display = 'none';
        initialsDisplay.style.display = 'none'; // कुछ न दिखे
    }

    // 3. संपर्क विवरण (Contact Details)
    const updateContactLine = (input, displayId, lineId) => {
        const value = input.trim();
        const lineElement = document.getElementById(lineId);
        
        if (value) {
            document.getElementById(displayId).innerText = value;
            lineElement.style.display = 'flex';
        } else {
            lineElement.style.display = 'none';
        }
    };

    updateContactLine(address, 'cv-address', 'cv-address-line');
    updateContactLine(phone, 'cv-phone', 'cv-phone-line');
    updateContactLine(email, 'cv-email', 'cv-email-line');

    
    // 4. शिक्षा विवरण (Education Details)
    const hscBoard = document.getElementById('hscBoard').value.trim();
    const hscPercentage = document.getElementById('hscPercentage').value.trim();
    const interBoard = document.getElementById('interBoard').value.trim();
    const interPercentage = document.getElementById('interPercentage').value.trim();
    const bachelorDegree = document.getElementById('bachelorDegree').value.trim();
    const bachelorCollege = document.getElementById('bachelorCollege').value.trim();
    const bachelorDuration = document.getElementById('bachelorDuration').value.trim();

    const eduOutput = document.getElementById('cv-education-output');
    eduOutput.innerHTML = ''; 

    // एक फ़ंक्शन जो एजुकेशन आइटम बनाता है
    const createEduItem = (title, institution, duration) => {
        const item = document.createElement('div');
        item.classList.add('edu-item');
        
        if (duration) item.innerHTML += `<p class="edu-duration">${duration}</p>`;
        
        const finalTitle = title.replace(/\(([^()]*)\)/g, (match, p1) => {
            return p1 ? ` (${p1})` : ''; 
        });
        if (finalTitle) item.innerHTML += `<h4 class="edu-title">${finalTitle}</h4>`;
        
        if (institution) item.innerHTML += `<p class="edu-institution">${institution}</p>`;

        eduOutput.appendChild(item);
    };

    // 5. एजुकेशन डेटा को CV में जोड़ना (Higher to Lower)
    let hasEducation = false;

    if (bachelorDegree || bachelorCollege || bachelorDuration) {
        const degreeTitle = bachelorDegree || 'Bachelor\'s Degree';
        createEduItem(degreeTitle, bachelorCollege, bachelorDuration);
        hasEducation = true;
    }
    
    if (interBoard || interPercentage) {
        const title = `12th / Intermediate (${interPercentage})`;
        createEduItem(title, interBoard, ''); 
        hasEducation = true;
    }

    if (hscBoard || hscPercentage) {
        const title = `10th / Matriculation (${hscPercentage})`;
        createEduItem(title, hscBoard, ''); 
        hasEducation = true;
    }

    // अगर शिक्षा का कोई विवरण नहीं है, तो प्लेसहोल्डर दिखाएँ
    if (!hasEducation) {
        eduOutput.innerHTML = '<p style="font-style: italic; color: #888; font-size:0.9em;">No education details added yet. Please fill the form.</p>';
    }
}

// पेज लोड होने पर CV को एक बार अपडेट करें
document.addEventListener('DOMContentLoaded', updateCV);

/**
 * PDF जनरेशन फ़ंक्शन
 * यह सुनिश्चित करता है कि डेटा अपडेट होने के बाद ही PDF बने।
 */
function prepareAndDownloadPDF() {
    // 1. सुनिश्चित करें कि CV सबसे पहले अपडेट हो जाए
    updateCV(); 

    const element = document.getElementById('cv-output-area');
    const name = document.getElementById('nameInput').value.trim() || 'My_Resume';
    
    // बटन को डिसेबल करें और स्टेट बदलें
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.innerText = "Generating PDF...";
    downloadBtn.disabled = true;

    // 2. PDF सेटिंग्स
    const opt = {
        margin:       0.5, 
        filename:     `${name.replace(/\s/g, '_')}_CV.pdf`, 
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, 
        jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
    };

    // 3. जनरेट और डाउनलोड करें
    // setTimeout का उपयोग करें ताकि CV को पूरी तरह से रेंडर होने का समय मिल सके
    setTimeout(() => {
        html2pdf().from(element).set(opt).save().then(() => {
            // डाउनलोड पूरा होने के बाद बटन को रीसेट करें
            downloadBtn.innerText = "📥 Download PDF";
            downloadBtn.disabled = false;
        }).catch(error => {
            console.error("PDF generation failed:", error);
            alert("Error: PDF could not be generated. Please check console for details.");
            downloadBtn.innerText = "📥 Download PDF";
            downloadBtn.disabled = false;
        });
    }, 50); // 50 मिलीसेकंड का विलंब (delay)
}
