/**
 * यह फ़ंक्शन फ़ॉर्म से डेटा लेता है और CV को लाइव अपडेट करता है।
 */
function updateCV() {
    // 1. व्यक्तिगत विवरण (Personal Details)
    const name = document.getElementById('nameInput').value.trim();
    const title = document.getElementById('titleInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();
    const summary = document.getElementById('summaryInput').value.trim();

    // नाम, पद, और सारांश (Summary)
    document.getElementById('cv-name').innerText = name;
    document.getElementById('cv-title').innerText = title;
    document.getElementById('cv-summary').innerText = summary;
    
    // 2. प्रोफ़ाइल फ़ोटो और इनिशियल्स
    const photoDisplay = document.getElementById('photo-display');
    const initialsDisplay = document.getElementById('initials-display');

    // इनिशियल्स कैलकुलेट करें (जैसे 'John Doe' के लिए 'JD')
    let initials = '';
    if (name) {
        const parts = name.split(' ');
        initials = parts.map(p => p.charAt(0).toUpperCase()).join('');
    }
    initialsDisplay.innerText = initials;

    // यदि नाम खाली है, तो 'AK' या कोई भी इनिशियल्स न दिखाएँ।
    if (!name) {
        initialsDisplay.style.display = 'none';
        photoDisplay.style.display = 'none';
    }

    // प्रोफ़ाइल फ़ोटो अपडेट करें
    const photoInput = document.getElementById('photoInput');
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoDisplay.src = e.target.result;
            photoDisplay.style.display = 'block';
            initialsDisplay.style.display = 'none'; // अगर फोटो है, तो इनिशियल्स छुपाएँ
        }
        reader.readAsDataURL(photoInput.files[0]);
    } else if (name) {
        // अगर फोटो नहीं है, लेकिन नाम है, तो इनिशियल्स दिखाएँ
        photoDisplay.style.display = 'none';
        initialsDisplay.style.display = 'flex';
    } else {
        photoDisplay.style.display = 'none';
        initialsDisplay.style.display = 'none';
    }

    // 3. संपर्क विवरण (Contact Details)
    // केवल तभी दिखाएँ जब डेटा भरा हो
    const updateContactLine = (input, displayId, lineId) => {
        const value = input.trim();
        const lineElement = document.getElementById(lineId);
        
        if (value) {
            document.getElementById(displayId).innerText = value;
            lineElement.style.display = 'flex'; // या 'block' / 'flex'
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
    eduOutput.innerHTML = ''; // पुराना डेटा हटा दें

    // एक फ़ंक्शन जो एजुकेशन आइटम बनाता है
    const createEduItem = (title, institution, duration) => {
        if (!title && !institution && !duration) return; // अगर कोई भी फ़ील्ड खाली है तो आइटम न बनाएँ

        const item = document.createElement('div');
        item.classList.add('edu-item');
        
        if (duration) item.innerHTML += `<p class="edu-duration">${duration}</p>`;
        if (title) item.innerHTML += `<h4 class="edu-title">${title}</h4>`;
        if (institution) item.innerHTML += `<p class="edu-institution">${institution}</p>`;

        eduOutput.appendChild(item);
    };

    // 5. एजुकेशन डेटा को CV में जोड़ना (नया लॉजिक)
    // 1. Bachelor's Degree
    if (bachelorDegree || bachelorCollege || bachelorDuration) {
        const degreeTitle = bachelorDegree || 'Bachelor\'s Degree';
        createEduItem(degreeTitle, bachelorCollege, bachelorDuration);
    }
    
    // 2. 12th / Intermediate
    if (interBoard || interPercentage) {
        const title = `12th / Intermediate (${interPercentage})`;
        createEduItem(title, interBoard, ''); // 12th में Duration खाली
    }

    // 3. 10th / Matriculation
    if (hscBoard || hscPercentage) {
        const title = `10th / Matriculation (${hscPercentage})`;
        createEduItem(title, hscBoard, ''); // 10th में Duration खाली
    }

    // यदि कोई एजुकेशन डेटा नहीं है
    if (eduOutput.innerHTML === '') {
        eduOutput.innerHTML = '<p style="font-style: italic; color: #888;">No education details added yet.</p>';
    }
}

// पेज लोड होने पर CV को सेट करें
document.addEventListener('DOMContentLoaded', updateCV);


/**
 * PDF जनरेशन फ़ंक्शन (यह पहले जैसा ही रहेगा, बस फ़ाइल का नाम बदल दिया है)
 */
function generatePDF() {
    const element = document.getElementById('cv-output-area'); // CV एरिया की ID
    const name = document.getElementById('nameInput').value.trim() || 'My_Resume';

    // PDF सेटिंग्स
    const opt = {
        margin:       0.5, 
        filename:     `${name.replace(/\s/g, '_')}_CV.pdf`, // नाम के अनुसार फ़ाइल नाम सेट करें
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, 
        jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
    };

    // html2pdf लाइब्रेरी का उपयोग करके PDF बनाएँ और डाउनलोड करें
    html2pdf().from(element).set(opt).save();
}
