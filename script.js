/*
====================================
  1. Base Styles and Layout
====================================
*/
:root {
    --primary-color: #A52A2A; /* Dark Maroon/Reddish-Brown */
    --secondary-color: #f4f4f9; 
    --text-color: #333;
    --light-text-color: #fff;
    --accent-color: #FF5733; /* For skill dots and icons */
}

body {
    font-family: 'Arial', sans-serif;
    background-color: var(--secondary-color);
    margin: 0;
    padding: 20px;
    color: var(--text-color);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
}

.container {
    display: flex;
    width: 95%;
    max-width: 1300px;
    gap: 20px;
}

/* इनपुट फॉर्म स्टाइलिंग */
.input-form {
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    height: fit-content;
    position: sticky;
    top: 20px;
}

.input-form h1, .input-form h2 {
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 5px;
    margin-top: 20px;
}

.input-form input, .input-form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
}
.input-form p {
    margin: 10px 0 5px 0;
    font-size: 0.9em;
    font-weight: bold;
}

.input-form button {
    width: 100%;
    padding: 15px;
    background-color: var(--primary-color);
    color: var(--light-text-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 15px;
    transition: background-color 0.3s;
}

.input-form button:hover {
    background-color: #8B0000;
}

.note {
    font-size: 12px;
    color: #888;
    margin-top: 10px;
    text-align: center;
}

/*
====================================
  2. CV Layout and Styling
====================================
*/
.cv-paper {
    flex: 2;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    /* A4 Size (important for download) */
    width: 794px; 
    min-height: 1123px; 
    border-radius: 4px;
}

.cv-grid {
    display: grid;
    grid-template-columns: 35% 65%; 
    min-height: 1123px; /* Ensure grid is at least A4 height */
}

/* Left Column Styling */
.left-column {
    background-color: var(--primary-color);
    color: var(--light-text-color);
    padding: 20px;
    /* This makes the background fill the whole column */
    display: flex;
    flex-direction: column; 
}
.extra-section {
    margin-top: auto; /* Pushes content to the bottom of the left column */
    padding-bottom: 20px;
}

.left-column h3 {
    border-bottom: 2px solid var(--light-text-color);
    padding-bottom: 5px;
    margin-top: 25px;
    font-size: 1.1em;
}

/* Profile Image */
.profile-image {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    color: var(--primary-color);
    font-weight: bold;
}
.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.name-display {
    font-size: 1.8em;
    margin: 0 0 5px 0;
    color: #fff;
}

.title-display {
    font-size: 1.1em;
    margin: 0;
    color: #fff;
    font-weight: 300;
}

.contact-section p {
    margin: 5px 0;
    font-size: 0.9em;
    display: flex; /* For icon alignment */
    align-items: center;
}
.contact-section i {
    margin-right: 10px;
    color: var(--accent-color);
}

/* Skills Style */
.skills-section ul, .extra-section ul {
    list-style: none;
    padding: 0;
}

.skills-section li {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
}
.extra-section li {
    margin-bottom: 5px;
    font-size: 0.9em;
}

.rating {
    display: flex;
    gap: 3px;
}
.rating::before {
    content: '● ● ● ● ●'; 
    color: #ccc;/**
 * यह फ़ंक्शन फ़ॉर्म से डेटा लेता है और CV को लाइव अपडेट करता है।
 */
function updateCV() {
    // 1. व्यक्तिगत विवरण
    const name = document.getElementById('nameInput').value.trim();
    const title = document.getElementById('titleInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();
    const summary = document.getElementById('summaryInput').value.trim();

    // नाम, पद, और सारांश
    document.getElementById('cv-name').innerText = name;
    document.getElementById('cv-title').innerText = title;
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
        initialsDisplay.style.display = 'flex';
    } else {
        photoDisplay.style.display = 'none';
        initialsDisplay.style.display = 'none';
    }

    // 3. संपर्क विवरण
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
        
        // Duration/Year (Optional)
        if (duration) item.innerHTML += `<p class="edu-duration">${duration}</p>`;
        
        // Degree/Class Title
        const finalTitle = title.replace(/\(([^()]*)\)/g, (match, p1) => {
            return p1 ? ` (${p1})` : ''; // अगर परसेंटेज है तो दिखाओ
        });
        if (finalTitle) item.innerHTML += `<h4 class="edu-title">${finalTitle}</h4>`;
        
        // Institution/Board
        if (institution) item.innerHTML += `<p class="edu-institution">${institution}</p>`;

        eduOutput.appendChild(item);
    };

    // 5. एजुकेशन डेटा को CV में जोड़ना (Higher to Lower)
    let hasEducation = false;

    // 1. Bachelor's Degree
    if (bachelorDegree || bachelorCollege || bachelorDuration) {
        const degreeTitle = bachelorDegree || 'Bachelor\'s Degree';
        createEduItem(degreeTitle, bachelorCollege, bachelorDuration);
        hasEducation = true;
    }
    
    // 2. 12th / Intermediate
    if (interBoard || interPercentage) {
        const title = `12th / Intermediate (${interPercentage})`;
        createEduItem(title, interBoard, ''); 
        hasEducation = true;
    }

    // 3. 10th / Matriculation
    if (hscBoard || hscPercentage) {
        const title = `10th / Matriculation (${hscPercentage})`;
        createEduItem(title, hscBoard, ''); 
        hasEducation = true;
    }

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
    
    document.getElementById('downloadBtn').innerText = "Generating PDF...";
    document.getElementById('downloadBtn').disabled = true;

    // 2. PDF सेटिंग्स
    const opt = {
        margin:       0.5, 
        filename:     `${name.replace(/\s/g, '_')}_CV.pdf`, 
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, // High resolution
        jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
    };

    // 3. जनरेट और डाउनलोड करें
    html2pdf().from(element).set(opt).save().then(() => {
        // डाउनलोड पूरा होने के बाद बटन को रीसेट करें
        document.getElementById('downloadBtn').innerText = "📥 Download PDF";
        document.getElementById('downloadBtn').disabled = false;
        alert("Your CV has been successfully generated and downloaded!");
    });
}
