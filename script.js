// --- STATE MANAGEMENT ---
let workHistoryCount = 1;
let educationCount = 1;
let skillCount = 1;
let languageCount = 1;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cvPreview')) {
        // Add default entries for initial view (not manual to keep forms clean)
        addWorkHistory(false); // Default Job, will be hidden if empty

        // Default Education entries
        addEducation(false, 'Bachelor', 'Appearing', 'Dr Ram Manohar Lohia Avadh University', '2024-2028', '', ''); // Subjects/Major is intentionally empty for Bachelor
        addEducation(false, '12th', 'Passed', 'UP Board/School', 'N/A', 'PCM', '60'); 
        addEducation(false, '10th', 'Passed', 'UP Board/School', 'N/A', 'N/A', '77'); 
        
        addSkill();
        addLanguage();

        // Add event listeners for all form elements to update CV
        // NOTE: We need to re-attach listeners dynamically for generated elements
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


// --- INPUT FIELD GENERATORS (No change) ---

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

function addSkill() {
    createInput('text', `skill${skillCount++}`, 'Skill (e.g., JavaScript, Python)', 'skillsContainer');
}

function addLanguage() {
    createInput('text', `language${languageCount++}`, 'Language (e.g., Hindi, English)', 'languagesContainer');
}


// --- EDUCATION LOGIC (NEW DROPDOWN FUNCTION) ---

function addEducationDropdown(isManual) {
    // This is for the manual 'Add Education' button
    const container = document.getElementById('educationContainer');
    const index = educationCount++;
    
    const div = document.createElement('div');
    div.className = 'edu-entry';
    div.id = `eduEntry${index}`;

    div.innerHTML = `
        <h4 style="margin-top: 15px; color: #444;">Education #${index}</h4>
        <p>Level:</p>
        <select id="levelSelect${index}" style="width: 100%; padding: 10px; margin-bottom: 10px;" onchange="updateEducationForm(${index}, this.value)">
            <option value="10th">10th / Matriculation</option>
            <option value="12th">12th / Intermediate</option>
            <option value="Bachelor" selected>Bachelor / Equivalent</option>
            <option value="Others">Others (Master/Diploma)</option>
        </select>
        
        <div id="dynamicEduFields${index}">
            </div>

        ${isManual ? `<button onclick="this.parentNode.remove(); updateCV()" style="width: 100%; padding: 8px; background-color: #f44336; margin-bottom: 10px;">Remove Education</button>` : ''}
        <hr style="border-top: 1px solid #eee; margin-top: 15px;">
    `;
    
    container.appendChild(div);
    
    // Automatically initialize with 'Bachelor' details
    updateEducationForm(index, 'Bachelor');
}

// Function to generate and initialize education form fields (Used by both manual and default)
function addEducation(isManual = false, courseType = 'Bachelor', status = 'Appearing', university = '', duration = '', subject = '', percentage = '') {
    const container = document.getElementById('educationContainer');
    const index = educationCount++;
    
    const div = document.createElement('div');
    div.className = 'edu-entry';
    div.id = `eduEntry${index}`;
    
    const isBachelorOrOther = (courseType === 'Bachelor' || courseType === 'Others');
    
    // Determine the course input type/value
    let courseInputHtml = '';
    if (courseType === 'Bachelor' || courseType === 'Others') {
        courseInputHtml = `<input type="text" id="course${index}" placeholder="e.g., B.Tech (Computer Science)" value="${courseType === 'Bachelor' ? 'B.Tech' : courseType === 'Others' ? 'M.Tech / PGDCA' : ''}">`;
    } else {
         courseInputHtml = `<input type="text" id="course${index}" placeholder="e.g., 10th / Matriculation" value="${courseType}">`;
    }

    const subjectDisplay = (courseType === '10th' || courseType === '12th') ? 'block' : 'none';

    div.innerHTML = `
        <h4 style="margin-top: 15px; color: #444;">Education #${index}</h4>
        <p>Course Level/Degree:</p>
        ${courseInputHtml}
        
        <p>Status:</p>
        <select id="statusSelect${index}" style="width: 100%; padding: 10px; margin-bottom: 10px;">
            <option value="Appearing" ${status === 'Appearing' ? 'selected' : ''}>Appearing</option>
            <option value="Passed" ${status === 'Passed' ? 'selected' : ''}>Passed</option>
        </select>
        
        <p>University/Board/College:</p><input type="text" id="university${index}" placeholder="University/Board/College Name" value="${university}">
        <p>Duration/Year (e.g., 2020-2024 or 2018):</p><input type="text" id="eduDuration${index}" placeholder="2020-2024" value="${duration}">
        
        <div id="subjectWrapper${index}" style="display: ${subjectDisplay};">
            <p>Subjects/Major:</p><input type="text" id="subject${index}" placeholder="PCM, Commerce, N/A" value="${subject}">
        </div>
        
        <p>Percentage/CGPA:</p><input type="text" id="percentage${index}" placeholder="Percentage/CGPA" value="${percentage}">
        
        ${isManual ? `<button onclick="this.parentNode.remove(); updateCV()" style="width: 100%; padding: 8px; background-color: #f44336; margin-bottom: 10px;">Remove Education</button>` : ''}
        <hr style="border-top: 1px solid #eee; margin-top: 15px;">
    `;

    container.appendChild(div);

    // Re-attach listeners to new inputs/selects
    div.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('input', updateCV);
        element.addEventListener('change', updateCV);
    });
    
    // Add event listener for course input to hide/show subject field (only needed for manual entries like 'Others')
    const courseInput = div.querySelector(`#course${index}`);
    if(courseInput) {
        courseInput.addEventListener('input', function() {
             const currentCourse = this.value.toLowerCase();
             const wrapper = document.getElementById(`subjectWrapper${index}`);
             if (currentCourse.includes('10th') || currentCourse.includes('12th')) {
                 wrapper.style.display = 'block';
             } else {
                 wrapper.style.display = 'none';
             }
        });
    }

    updateCV();
}


// Function to dynamically update form when dropdown changes (For manual add only)
function updateEducationForm(index, level) {
    const dynamicContainer = document.getElementById(`dynamicEduFields${index}`);
    const eduEntry = document.getElementById(`eduEntry${index}`);
    
    let coursePlaceholder = '';
    let subjectDisplay = 'none';
    
    if (level === '10th') {
        coursePlaceholder = '10th / Matriculation';
        subjectDisplay = 'block';
    } else if (level === '12th') {
        coursePlaceholder = '12th / Intermediate';
        subjectDisplay = 'block';
    } else if (level === 'Bachelor') {
        coursePlaceholder = 'e.g., B.Tech (Computer Science), B.Sc.';
    } else { // Others
        coursePlaceholder = 'e.g., M.Tech, Diploma, PGDCA';
    }
    
    // Clear previous dynamic fields (except the select box which is in the parent)
    eduEntry.innerHTML = `
        <h4 style="margin-top: 15px; color: #444;">Education #${index}</h4>
        <p>Level:</p>
        <select id="levelSelect${index}" style="width: 100%; padding: 10px; margin-bottom: 10px;" onchange="updateEducationForm(${index}, this.value)">
            <option value="10th" ${level === '10th' ? 'selected' : ''}>10th / Matriculation</option>
            <option value="12th" ${level === '12th' ? 'selected' : ''}>12th / Intermediate</option>
            <option value="Bachelor" ${level === 'Bachelor' ? 'selected' : ''}>Bachelor / Equivalent</option>
            <option value="Others" ${level === 'Others' ? 'selected' : ''}>Others (Master/Diploma)</option>
        </select>
        
        <p>Course/Degree Name:</p><input type="text" id="course${index}" placeholder="${coursePlaceholder}" value="${level === '10th' ? '10th / Matriculation' : level === '12th' ? '12th / Intermediate' : ''}">
        
        <p>Status:</p>
        <select id="statusSelect${index}" style="width: 100%; padding: 10px; margin-bottom: 10px;">
            <option value="Appearing">Appearing</option>
            <option value="Passed" selected>Passed</option>
        </select>
        
        <p>University/Board/College:</p><input type="text" id="university${index}" placeholder="University/Board/College Name">
        <p>Duration/Year (e.g., 2020-2024 or 2018):</p><input type="text" id="eduDuration${index}" placeholder="2020-2024 or 2018">
        
        <div id="subjectWrapper${index}" style="display: ${subjectDisplay};">
            <p>Subjects/Major:</p><input type="text" id="subject${index}" placeholder="PCM, Commerce, N/A">
        </div>
        
        <p>Percentage/CGPA:</p><input type="text" id="percentage${index}" placeholder="Percentage/CGPA">
        
        <button onclick="this.parentNode.remove(); updateCV()" style="width: 100%; padding: 8px; background-color: #f44336; margin-bottom: 10px;">Remove Education</button>
        <hr style="border-top: 1px solid #eee; margin-top: 15px;">
    `;
    
    // Re-attach listeners to new inputs/selects
    eduEntry.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('input', updateCV);
        element.addEventListener('change', updateCV);
    });
    
    updateCV();
}

// --- THEME COLOR UPDATER ---

function updateTheme() {
    const color = document.getElementById('themeColor').value;
    document.documentElement.style.setProperty('--primary-color', color);
}


// --- CV PREVIEW UPDATER (UPDATED Work History & Education Logic) ---

function updateCV() {
    // Helper function to safely update the paragraph content
    const updateSection = (id, value) => {
        document.getElementById(id).innerHTML = `<p>${value.replace(/\n/g, '</p><p>')}</p>`;
    };
    
    // Personal Details (No change)
    document.getElementById('cvFullName').textContent = document.getElementById('fullName').value || 'Your Name';
    document.getElementById('cvPhone').innerHTML = `<i class="fas fa-phone"></i> ${document.getElementById('phone').value || '+91 9876543210'}`;
    document.getElementById('cvEmail').innerHTML = `<i class="fas fa-envelope"></i> ${document.getElementById('email').value || 'example@email.com'}`;
    document.getElementById('cvAddress').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${document.getElementById('address').value || 'Address, City, Country'}`;
    
    // Photo (No change)
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

    // Career Objective, Summary, and Declaration (No change)
    updateSection('cvObjective', document.getElementById('objective').value);
    updateSection('cvSummary', document.getElementById('summary').value);
    updateSection('cvDeclaration', document.getElementById('declaration').value);


    // Skills & Languages (No change)
    const skillsList = document.getElementById('cvSkillsList');
    skillsList.innerHTML = '';
    document.getElementById('skillsContainer').querySelectorAll('input[type="text"]').forEach(input => {
        if (input.value.trim()) {
            const li = document.createElement('li');
            li.textContent = input.value.trim();
            skillsList.appendChild(li);
        }
    });

    const languagesList = document.getElementById('cvLanguagesList');
    languagesList.innerHTML = '';
    document.getElementById('languagesContainer').querySelectorAll('input[type="text"]').forEach(input => {
        if (input.value.trim()) {
            const li = document.createElement('li');
            li.textContent = input.value.trim();
            languagesList.appendChild(li);
        }
    });

    // *** WORK HISTORY LOGIC (Hide if empty) ***
    const workHistorySection = document.getElementById('cvWorkHistory');
    const workHeader = document.getElementById('workHeader');
    workHistorySection.innerHTML = ''; 
    let workEntries = 0;
    
    document.getElementById('workHistoryContainer').querySelectorAll('.work-entry').forEach((entry, index) => {
        const title = entry.querySelector(`#jobTitle${index + 1}`) ? entry.querySelector(`#jobTitle${index + 1}`).value : '';
        const company = entry.querySelector(`#company${index + 1}`) ? entry.querySelector(`#company${index + 1}`).value : '';
        const duration = entry.querySelector(`#duration${index + 1}`) ? entry.querySelector(`#duration${index + 1}`).value : '';
        const tasksText = entry.querySelector(`#tasks${index + 1}`) ? entry.querySelector(`#tasks${index + 1}`).value : '';
        
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
        // Hide the entire section if no work is entered
        workHistorySection.style.display = 'none';
        workHeader.style.display = 'none';
    } else {
        // Show the section if at least one valid entry exists
        workHistorySection.style.display = 'block';
        workHeader.style.display = 'block';
    }
    // *** END WORK HISTORY LOGIC ***


    // *** UPDATED Education Logic ***
    const educationSection = document.getElementById('cvEducation');
    educationSection.innerHTML = ''; 
    let eduEntries = 0;
    
    document.getElementById('educationContainer').querySelectorAll('.edu-entry').forEach((entry, index) => {
        // Find inputs dynamically. Check for existence as manual entries use different structure
        const course = entry.querySelector(`#course${index + 1}`) ? entry.querySelector(`#course${index + 1}`).value : '';
        const status = entry.querySelector(`#statusSelect${index}`) ? entry.querySelector(`#statusSelect${index}`).value : 
                       (entry.querySelector(`#status${index + 1}`) ? entry.querySelector(`#status${index + 1}`).value : ''); // Fallback for old style status input
        const university = entry.querySelector(`#university${index + 1}`) ? entry.querySelector(`#university${index + 1}`).value : '';
        const duration = entry.querySelector(`#eduDuration${index + 1}`) ? entry.querySelector(`#eduDuration${index + 1}`).value : '';
        
        // Subject logic (check if input exists and is visible)
        const subjectInput = entry.querySelector(`#subject${index + 1}`);
        let subject = '';
        if (subjectInput) {
             // If subject input exists, check if its wrapper is visible (for manual entries)
            const subjectWrapper = entry.querySelector(`#subjectWrapper${index}`);
            if (!subjectWrapper || subjectWrapper.style.display !== 'none') {
                 subject = subjectInput.value;
            }
        }
        
        const percentage = entry.querySelector(`#percentage${index + 1}`) ? entry.querySelector(`#percentage${index + 1}`).value : '';

        if (course.trim() || university.trim() || duration.trim()) {
            eduEntries++;
            const div = document.createElement('div');
            div.className = 'edu-item';
            
            // Format 1: Course (Status)
            let titleLine = `${course || 'Course/Degree'}`;
            if (status.trim()) {
                titleLine += ` <span class="edu-status">(${status.trim()})</span>`;
            }

            // Format 2: University/College
            let universityLine = `${university || 'University/College'}`;
            
            // Format 3: Details (Duration, Subjects, Percentage)
            let detailsLine = '';
            const details = [];

            if (duration.trim()) {
                details.push(`Duration: ${duration.trim()}`);
            }
            if (subject.trim()) {
                details.push(`Subjects: ${subject.trim()}`);
            }
            if (percentage.trim()) {
                details.push(`Percentage/CGPA: ${percentage.trim()}`);
            }
            
            if (details.length > 0) {
                 detailsLine = `<p class="edu-line">${details.join(' | ')}</p>`;
            }


            div.innerHTML = `
                <p class="edu-title">${titleLine}</p>
                <p class="edu-line">${universityLine}</p>
                ${detailsLine}
            `;
            educationSection.appendChild(div);
        }
    });
    
    if (eduEntries === 0) {
        educationSection.innerHTML = '<p class="filler-content">No education details added yet. Please fill the form.</p>';
    }
    // *** END Education Logic Update ***
}

// --- PDF DOWNLOADER (No change) ---

function downloadPDF() {
    const cvElement = document.getElementById('cvPreview');
    const filename = (document.getElementById('fullName').value.replace(/\s/g, '_') || 'My_Resume') + '.pdf';

    // 1. Add the special class to trigger PDF-specific CSS (including the border fix)
    cvElement.classList.add('pdf-downloading');
    
    // Ensure the CV preview is updated one last time before download
    updateCV();

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
        // Restore UI visibility in case work history was hidden
        updateCV();
    });
}
