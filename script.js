/**
 * यह फ़ंक्शन फ़ॉर्म से डेटा लेता है और CV को लाइव अपडेट करता है।
 */
function updateCV() {
    // 1. व्यक्तिगत विवरण
    const name = document.getElementById('nameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();

    document.getElementById('cv-name').innerText = name;
    
    // 2. प्रोफ़ाइल फ़ोटो और संपर्क विवरण (Logic remains the same)
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

    // संपर्क विवरण
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

    
    // 3. कौशल (Skills) को लिस्ट में दिखाना (NEW)
    const skillsInput = document.getElementById('skillsInput').value.trim();
    const skillsOutput = document.getElementById('cv-skills-output');
    skillsOutput.innerHTML = '';
    
    if (skillsInput) {
        const skillList = skillsInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
        skillList.forEach(skill => {
            skillsOutput.innerHTML += `<li>${skill}</li>`;
        });
    } else {
        skillsOutput.innerHTML = '<li style="font-size:0.9em; font-style: italic;">No skills added.</li>';
    }

    // 4. भाषाएँ (Languages) को लिस्ट में दिखाना (NEW)
    const languagesInput = document.getElementById('languagesInput').value.trim();
    const languagesOutput = document.getElementById('cv-languages-output');
    languagesOutput.innerHTML = '';
    
    if (languagesInput) {
        const langList = languagesInput.split(',').map(l => l.trim()).filter(l => l.length > 0);
        langList.forEach(lang => {
            languagesOutput.innerHTML += `<li>${lang}</li>`;
        });
    } else {
        languagesOutput.innerHTML = '<li style="font-size:0.9em; font-style: italic;">No languages added.</li>';
    }


    // 5. शिक्षा विवरण (Education Details) - DETAILED OUTPUT (NEW)
    const bachelorDegree = document.getElementById('bachelorDegree').value.trim();
    const bachelorCollege = document.getElementById('bachelorCollege').value.trim();
    const bachelorBoard = document.getElementById('bachelorBoard').value.trim();
    const bachelorPercentage = document.getElementById('bachelorPercentage').value.trim();
    const bachelorDuration = document.getElementById('bachelorDuration').value.trim();
    
    const interSubjects = document.getElementById('interSubjects').value.trim();
    const interBoard = document.getElementById('interBoard').value.trim();
    const interPercentage = document.getElementById('interPercentage').value.trim();

    const hscBoard = document.getElementById('hscBoard').value.trim();
    const hscPercentage = document.getElementById('hscPercentage').value.trim();

    const eduOutput = document.getElementById('cv-education-output');
    eduOutput.innerHTML = ''; 
    let hasEducation = false;

    // A function to create detailed education item
    const createDetailedEduItem = (title, lines) => {
        const item = document.createElement('div');
        item.classList.add('edu-item');
        item.innerHTML += `<h4 class="edu-title">${title}</h4>`;
        
        lines.forEach(line => {
            if (line.value) {
                item.innerHTML += `<p class="edu-line"><strong>${line.label}:</strong> ${line.value}</p>`;
            }
        });
        eduOutput.appendChild(item);
    };

    // 1. Bachelor's Degree
    if (bachelorDegree || bachelorCollege || bachelorPercentage) {
        const title = bachelorDegree || "Bachelor's Degree";
        createDetailedEduItem(title, [
            { label: "University/College", value: bachelorCollege },
            { label: "Board/Authority", value: bachelorBoard },
            { label: "Percentage/CGPA", value: bachelorPercentage },
            { label: "Duration", value: bachelorDuration }
        ]);
        hasEducation = true;
    }
    
    // 2. 12th / Intermediate
    if (interBoard || interPercentage || interSubjects) {
        const title = "12th / Intermediate";
        createDetailedEduItem(title, [
            { label: "Subjects", value: interSubjects },
            { label: "Board/School", value: interBoard },
            { label: "Percentage/CGPA", value: interPercentage }
        ]);
        hasEducation = true;
    }

    // 3. 10th / Matriculation
    if (hscBoard || hscPercentage) {
        const title = "10th / Matriculation";
        createDetailedEduItem(title, [
            { label: "Board/School", value: hscBoard },
            { label: "Percentage/CGPA", value: hscPercentage }
        ]);
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
 */
function prepareAndDownloadPDF() {
    updateCV(); 

    const element = document.getElementById('cv-output-area');
    const name = document.getElementById('nameInput').value.trim() || 'My_Resume';
    
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.innerText = "Generating PDF...";
    downloadBtn.disabled = true;

    // PDF सेटिंग्स
    const opt = {
        margin:       0.5, 
        filename:     `${name.replace(/\s/g, '_')}_CV.pdf`, 
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, 
        jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
    };

    // Generate and Download
    setTimeout(() => {
        html2pdf().from(element).set(opt).save().then(() => {
            downloadBtn.innerText = "📥 Download PDF";
            downloadBtn.disabled = false;
        }).catch(error => {
            console.error("PDF generation failed:", error);
            alert("Error: PDF could not be generated. Please check console for details.");
            downloadBtn.innerText = "📥 Download PDF";
            downloadBtn.disabled = false;
        });
    }, 50); 
}
