// --- STATE MANAGEMENT ---
let workHistoryCount = 1;
let educationCount = 1;
let skillCount = 1;
let languageCount = 1;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cvPreview')) {
        // Add default entries for initial view (not manual to keep forms clean)
        addWorkHistory(false);
        addEducation(false);
        addSkill();
        addLanguage();

        // Add event listeners for all form elements to update CV
        document.querySelectorAll('.input-form input, .input-form textarea, .input-form select').forEach(element => {
            element.addEventListener('input', updateCV);
        });

        // Add event listener for the theme color dropdown
        document.getElementById('themeColor').addEventListener('change', updateTheme);

        // Call once to load initial defaults and theme
        updateCV();
        updateTheme();
    }
});


// --- INPUT FIELD GENERATORS ---

function createInput(type, id, placeholder, containerId, value = '') {
    const container = document.getElementById(containerId);
    const input = document.createElement(type === 'textarea' ? 'textarea' : 'input');
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    input.value = value;
    input.addEventListener('input', updateCV);
    
    const wrapper = document.createElement('div');
    wrapper.className = 'input-wrapper';
    
    // Create Label
    const label = document.createElement('p');
    label.textContent = placeholder.split('(')[0].trim() + ':';
    wrapper.appendChild(label);


    // Create Remove Button
    if (container.children.length > 0) {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            container.removeChild(wrapper);
            updateCV();
        };
        removeBtn.style.cssText = 'width: 15%; padding: 10px; background-color: #f44336; font-size: 14px; margin-left: 5px;';
        input.style.width = 'calc(85% - 5px)';
        input.style.display = 'inline-block';
        
        wrapper.appendChild(input);
        wrapper.appendChild(removeBtn);
    } else {
        input.style.width = '100%';
        wrapper.appendChild(input);
    }
    
    container.appendChild(wrapper);
}

function addWorkHistory(isManual = true) {
    const container = document.getElementById('workHistoryContainer');
    const index = workHistoryCount++;

    const div = document.createElement('div');
    div.className = 'work-entry';
    div.innerHTML = `
        <h4 style="margin-top: 15px; color: #444;">Job #${index}</h4>
        <p>Job Title:</p><input type="text" id="jobTitle${index}" placeholder="Senior Developer">
        <p>Company Name:</p><input type="text" id="company${index}" placeholder="Company Name">
        <p>Duration:</p><input type="text" id="duration${index}" placeholder="2020 - Present">
        <p>Key Responsibilities (one per line):</p><textarea id="tasks${index}" placeholder="Key Responsibilities" rows="3"></textarea>
        ${isManual ? `<button onclick="this.parentNode.remove(); updateCV()" style="width: 100%; padding: 8px; background-color: #f44336; margin-bottom: 10px;">Remove Job</button>` : ''}
        <hr style="border-top: 1px solid #eee; margin-top: 15px;">
    `;

    div.querySelectorAll('input, textarea').forEach(element => {
        element.addEventListener('input', updateCV);
    });

    container.appendChild(div);
    updateCV();
}

function addEducation(isManual = true) {
    const container = document.getElementById('educationContainer');
    const index = educationCount++;
    
    const div = document.createElement('div');
    div.className = 'edu-entry';
    div.innerHTML = `
        <h4 style="margin-top: 15px; color: #444;">Education #${index}</h4>
        <p>Course/Degree:</p><input type="text" id="course${index}" placeholder="B.Tech (Computer Science)">
        <p>University/College:</p><input type="text" id="university${index}" placeholder="University/College Name">
        <p>Duration:</p><input type="text" id="eduDuration${index}" placeholder="2020-2024">
        <p>Subjects/Major:</p><input type="text" id="subject${index}" placeholder="Subjects/Major">
        <p>Percentage/CGPA:</p><input type="text" id="percentage${index}" placeholder="Percentage/CGPA">
        ${isManual ? `<button onclick="this.parentNode.remove(); updateCV()" style="width: 100%; padding: 8px; background-color: #f44336; margin-bottom: 10px;">Remove Education</button>` : ''}
        <hr style="border-top: 1px solid #eee; margin-top: 15px;">
    `;

    div.querySelectorAll('input, textarea').forEach(element => {
        element.addEventListener('input', updateCV);
    });

    container.appendChild(div);
    updateCV();
}

function addSkill() {
    createInput('text', `skill${skillCount++}`, 'Skill (e.g., JavaScript, Python)', 'skillsContainer');
}

function addLanguage() {
    createInput('text', `language${languageCount++}`, 'Language (e.g., Hindi, English)', 'languagesContainer');
}


// --- THEME COLOR UPDATER ---

function updateTheme() {
    const color = document.getElementById('themeColor').value;
    document.documentElement.style.setProperty('--primary-color', color);
}


// --- CV PREVIEW UPDATER ---

function updateCV() {
    // Personal Details
    document.getElementById('cvFullName').textContent = document.getElementById('fullName').value || 'Your Name';
    document.getElementById('cvPhone').innerHTML = `<i class="fas fa-phone"></i> ${document.getElementById('phone').value || '+91 9876543210'}`;
    document.getElementById('cvEmail').innerHTML = `<i class="fas fa-envelope"></i> ${document.getElementById('email').value || 'example@email.com'}`;
    document.getElementById('cvAddress').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${document.getElementById('address').value || 'Address, City, Country'}`;
    
    // Photo
    const photoInput = document.getElementById('photo');
    const placeholder = document.getElementById('profileImagePlaceholder');
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            placeholder.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
        }
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        placeholder.innerHTML = `<i class="fas fa-camera"></i>`;
    }

    // Career Objective & Summary
    document.getElementById('cvObjective').innerHTML = `<p>${document.getElementById('objective').value.replace(/\n/g, '</p><p>') || 'An enthusiastic and hardworking individual with the ability to adapt to new situations quickly...'}</p>`;
    document.getElementById('cvSummary').innerHTML = `<p>${document.getElementById('summary').value.replace(/\n/g, '</p><p>') || 'A dedicated and detail-oriented individual with strong technical and analytical skills...'}</p>`;
    
    // Declaration
    document.getElementById('cvDeclaration').innerHTML = `<p>${document.getElementById('declaration').value.replace(/\n/g, '</p><p>') || 'I look forward to being a part of a progressive organization...'}</p>`;


    // Skills
    const skillsList = document.getElementById('cvSkillsList');
    skillsList.innerHTML = '';
    document.getElementById('skillsContainer').querySelectorAll('input[type="text"]').forEach(input => {
        if (input.value.trim()) {
            const li = document.createElement('li');
            li.textContent = input.value.trim();
            skillsList.appendChild(li);
        }
    });

    // Languages
    const languagesList = document.getElementById('cvLanguagesList');
    languagesList.innerHTML = '';
    document.getElementById('languagesContainer').querySelectorAll('input[type="text"]').forEach(input => {
        if (input.value.trim()) {
            const li = document.createElement('li');
            li.textContent = input.value.trim();
            languagesList.appendChild(li);
        }
    });

    // Work History
    const workHistorySection = document.getElementById('cvWorkHistory');
    workHistorySection.innerHTML = ''; 
    let workEntries = 0;
    
    document.getElementById('workHistoryContainer').querySelectorAll('.work-entry').forEach((entry, index) => {
        const title = entry.querySelector(`#jobTitle${index + 1}`).value;
        const company = entry.querySelector(`#company${index + 1}`).value;
        const duration = entry.querySelector(`#duration${index + 1}`).value;
        const tasksText = entry.querySelector(`#tasks${index + 1}`).value;
        
        if (title.trim() || company.trim() || duration.trim() || tasksText.trim()) {
            workEntries++;
            const div = document.createElement('div');
            div.className = 'job-item';
            div.innerHTML = `
                <h4 style="margin: 0; color: #444;">${title || 'Job Title'} at ${company || 'Company'}</h4>
                <p style="margin: 0 0 5px 0; font-size: 0.85em; color: #555;">${duration || 'Duration'}</p>
                <ul class="job-tasks">
                    ${tasksText.split('\n').map(task => task.trim() ? `<li>${task.trim()}</li>` : '').join('')}
                </ul>
            `;
            workHistorySection.appendChild(div);
        }
    });
    
    if (workEntries === 0) {
        workHistorySection.innerHTML = '<p class="filler-content">No work experience added yet. Please fill the form.</p>';
    }

    // Education
    const educationSection = document.getElementById('cvEducation');
    educationSection.innerHTML = ''; 
    let eduEntries = 0;
    
    document.getElementById('educationContainer').querySelectorAll('.edu-entry').forEach((entry, index) => {
        const course = entry.querySelector(`#course${index + 1}`).value;
        const university = entry.querySelector(`#university${index + 1}`).value;
        const duration = entry.querySelector(`#eduDuration${index + 1}`).value;
        const subject = entry.querySelector(`#subject${index + 1}`).value;
        const percentage = entry.querySelector(`#percentage${index + 1}`).value;

        if (course.trim() || university.trim() || duration.trim()) {
            eduEntries++;
            const div = document.createElement('div');
            div.className = 'edu-item';
            div.innerHTML = `
                <p class="edu-title">${course || 'Course/Degree'} <span class="edu-status">(${duration || 'Duration'})</span></p>
                <p class="edu-line">${university || 'University/College'}</p>
                ${(subject.trim() || percentage.trim()) ? `<p class="edu-line">Subjects: ${subject || 'N/A'} | Percentage/CGPA: ${percentage || 'N/A'}</p>` : ''}
            `;
            educationSection.appendChild(div);
        }
    });
    
    if (eduEntries === 0) {
        educationSection.innerHTML = '<p class="filler-content">No education details added yet. Please fill the form.</p>';
    }
}

// --- PDF DOWNLOADER ---

function downloadPDF() {
    const cvElement = document.getElementById('cvPreview');
    const filename = (document.getElementById('fullName').value.replace(/\s/g, '_') || 'My_Resume') + '.pdf';

    // 1. Add the special class to trigger PDF-specific CSS (including the border fix)
    cvElement.classList.add('pdf-downloading');

    // 2. Configuration for html2pdf
    const opt = {
        margin: [0, 0, 0, 0], // Remove default margin
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 4, // Higher scale for better resolution
            logging: true, 
            useCORS: true 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 3. Generate PDF
    html2pdf().from(cvElement).set(opt).save().then(() => {
        // 4. IMPORTANT: Remove the class after download is complete
        cvElement.classList.remove('pdf-downloading');
    });
}
