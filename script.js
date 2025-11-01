/**
 * Debounce function: Ensures function isn't called too frequently.
 * @param {function} func - The function to debounce.
 * @param {number} delay - The delay time (in ms).
 */
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

/**
 * Changes the theme color of the CV.
 * @param {string} colorCode - The new color code (e.g., '#004D40').
 */
function changeThemeColor(colorCode) {
    document.documentElement.style.setProperty('--primary-color', colorCode);
    // Also update the button's background color
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.style.backgroundColor = colorCode;
    }
}

/**
 * Dynamically adjusts the height of the CV page based on content to minimize gaps.
 */
function adjustCVHeight() {
    const cvOutput = document.getElementById('cv-output-area');
    
    // Check if the current template is a two-column layout (Template 1, 4, 6, 8, 9)
    // We check for the presence of the two-column grid style on screen
    const isTwoColumn = window.getComputedStyle(cvOutput.querySelector('.cv-grid')).gridTemplateColumns.includes('%');

    if (isTwoColumn) {
        const leftCol = cvOutput.querySelector('.left-column');
        const rightCol = cvOutput.querySelector('.right-column');
        
        // Measures the height of both columns
        const leftHeight = leftCol.scrollHeight;
        const rightHeight = rightCol.scrollHeight;
        
        // Sets the height of the CV output as the maximum height
        const newHeight = Math.max(leftHeight, rightHeight);
        
        // Set CV container height (50px buffer for padding)
        cvOutput.style.height = `${newHeight + 50}px`; 
        
        // Set Left column's min-height to equal the Right column's height 
        leftCol.style.minHeight = `${rightHeight}px`; 
    } else {
        // For single column templates (Template 2, 3, 5, 7, 10), reset styles for normal flow
        cvOutput.style.height = 'auto';
        const leftCol = cvOutput.querySelector('.left-column');
        if (leftCol) leftCol.style.minHeight = 'auto';
    }
}


/**
 * Fetches data from the form and updates the CV live.
 */
function updateCV() {
    // 0. Update theme color
    const colorPicker = document.getElementById('colorPicker');
    const selectedColor = colorPicker ? colorPicker.value : '#A52A2A'; 
    changeThemeColor(selectedColor);
    
    // 1. Personal Details
    const name = document.getElementById('nameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();
    
    document.getElementById('cv-name').innerText = name;
    
    // 2. Profile Photo and Contact Details
    const photoDisplay = document.getElementById('photo-display');
    const initialsDisplay = document.getElementById('initials-display');
    const photoInput = document.getElementById('photoInput');

    let initials = '';
    if (name) {
        const parts = name.split(' ');
        initials = parts.slice(0, 2).map(p => p.charAt(0).toUpperCase()).join('');
    }
    initialsDisplay.innerText = initials;

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

    // Update and show/hide contact lines
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

    
    // 3. Career Objective (Updated Default Text)
    const objectiveInput = document.getElementById('objectiveInput').value.trim();
    const objectiveOutput = document.getElementById('cv-objective-output');
    
    // NEW DEFAULT CAREER OBJECTIVE TEXT
    const defaultObjective = "A highly motivated and enthusiastic individual, eager to learn and grow in the field of web development and technology. I aim to work in a dynamic organization where I can apply my technical knowledge, enhance my skills through continuous learning, and contribute effectively towards achieving the company’s goals. My objective is to build a successful career through dedication, creativity, and consistent performance.";

    objectiveOutput.innerText = objectiveInput || defaultObjective;
    
    // 4. Professional Summary (STATIC CONTENT - as requested)
    const professionalSummaryOutput = document.getElementById('cv-professional-summary-output');
    if (professionalSummaryOutput) {
        // PROFESSIONAL SUMMARY TEXT
        professionalSummaryOutput.innerText = "A dedicated and detail-oriented individual with strong technical and analytical skills. Passionate about learning emerging technologies and applying innovative solutions to real-world challenges. Able to work both independently and collaboratively within a team to achieve organizational goals.";
    }

    
    // 5. Skills list
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

    // 6. Languages list
    const languagesInput = document.getElementById('languagesInput').value.trim();
    const languagesOutput = document.getElementById('cv-languages-output');
    languagesOutput.innerHTML = '';
    
    if (languagesInput) {
        const langList = languagesInput
            .split(/,|\n/)
            .map(l => l.trim())
            .filter(l => l.length > 0);
            
        langList.forEach(lang => {
            languagesOutput.innerHTML += `<li>${lang}</li>`;
        });
    } else {
        languagesOutput.innerHTML = '<li style="font-size:0.9em; font-style: italic;">No languages added.</li>';
    }


    // 7. Work History - Hide when empty
    const workHistoryInput = document.getElementById('workHistoryInput').value.trim();
    const workHistoryContainer = document.getElementById('work-history-main-container');
    const workHistoryOutput = document.getElementById('cv-work-history-output');

    if (workHistoryInput) {
        workHistoryContainer.style.display = 'block';
        
        // Split input by new line to create list items
        const jobLines = workHistoryInput.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
            
        let jobHTML = '<div class="job-item"><ul class="job-tasks">';
        
        // Simple heuristic: Treat the first non-empty line as the main job title/summary
        // All subsequent lines are bullet points
        jobLines.forEach((line, index) => {
            if (index === 0) {
                 jobHTML = `<div class="job-item"><p><strong>${line}</strong></p><ul class="job-tasks">`;
            } else {
                jobHTML += `<li>${line}</li>`;
            }
        });

        jobHTML += '</ul></div>';
        workHistoryOutput.innerHTML = jobHTML;
        
    } else {
        workHistoryContainer.style.display = 'none';
    }


    // 8. Education Details - with Passed/Appearing logic
    const bachelorDegree = document.getElementById('bachelorDegree').value.trim();
    const bachelorCollege = document.getElementById('bachelorCollege').value.trim();
    const bachelorPercentage = document.getElementById('bachelorPercentage').value.trim();
    const bachelorDuration = document.getElementById('bachelorDuration').value.trim();
    const bachelorStatus = document.getElementById('bachelorStatus').value; 

    const interSubjects = document.getElementById('interSubjects').value.trim();
    const interBoard = document.getElementById('interBoard').value.trim();
    const interPercentage = document.getElementById('interPercentage').value.trim();
    const interStatus = document.getElementById('interStatus').value; 

    const hscBoard = document.getElementById('hscBoard').value.trim();
    const hscPercentage = document.getElementById('hscPercentage').value.trim();
    const hscStatus = document.getElementById('hscStatus').value; 

    const eduOutput = document.getElementById('cv-education-output');
    eduOutput.innerHTML = ''; 
    let hasEducation = false;

    // Function to create detailed education item
    const createDetailedEduItem = (title, status, lines) => {
        const item = document.createElement('div');
        item.classList.add('edu-item');
        item.innerHTML += `<h4 class="edu-title">${title} <span class="edu-status">(${status})</span></h4>`;
        
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
        createDetailedEduItem(title, bachelorStatus, [
            { label: "University/College", value: bachelorCollege },
            { label: "Percentage/CGPA", value: bachelorPercentage },
            { label: "Duration", value: bachelorDuration }
        ]);
        hasEducation = true;
    }
    
    // 2. 12th / Intermediate
    if (interBoard || interPercentage || interSubjects) {
        const title = "12th / Intermediate";
        createDetailedEduItem(title, interStatus, [
            { label: "Subjects", value: interSubjects },
            { label: "Board/School", value: interBoard },
            { label: "Percentage/CGPA", value: interPercentage }
        ]);
        hasEducation = true;
    }

    // 3. 10th / Matriculation
    if (hscBoard || hscPercentage) {
        const title = "10th / Matriculation";
        createDetailedEduItem(title, hscStatus, [
            { label: "Board/School", value: hscBoard },
            { label: "Percentage/CGPA", value: hscPercentage }
        ]);
        hasEducation = true;
    }

    if (!hasEducation) {
        eduOutput.innerHTML = '<p style="font-style: italic; color: #888; font-size:0.9em;">No education details added yet. Please fill the form.</p>';
    }
    
    // 9. Declaration (Updated Static Content)
    const declarationOutput = document.getElementById('cv-declaration-output');
    if (declarationOutput) {
           // NEW DECLARATION TEXT
        declarationOutput.innerHTML = `<p id="cv-summary-para2">I hereby declare that all the information mentioned above is true and correct to the best of my knowledge and belief. I take full responsibility for the accuracy of the details provided. I assure you that I will carry out my duties with full sincerity, honesty, and commitment if given an opportunity to be a part of your esteemed organization. I am confident that my abilities and enthusiasm will be valuable in contributing to the company’s growth and success.</p>`;
    }


    // Dynamic Height Adjustment (Logic to remove white space)
    setTimeout(adjustCVHeight, 100); 
}

// Debounced version of updateCV (300ms delay to prevent jumping while typing/selecting)
const debouncedUpdateCV = debounce(updateCV, 300);

/**
 * PDF Generation Function.
 * FIX: Adds logic to handle single-column templates by moving left-column content to right-column temporarily.
 */
function prepareAndDownloadPDF() {
    updateCV(); 

    const element = document.getElementById('cv-output-area');
    const name = document.getElementById('nameInput').value.trim() || 'My_Resume';
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.innerText = "Generating PDF...";
    downloadBtn.disabled = true;

    // --- CRITICAL FIX FOR SINGLE COLUMN TEMPLATES (2, 3, 5, 7, 10) ---
    let leftColumnContent = null;
    const isSingleColumn = ['template-style-2', 'template-style-3', 'template-style-5', 'template-style-7', 'template-style-10'].some(cls => element.classList.contains(cls));
    
    if (isSingleColumn) {
        const leftColumn = element.querySelector('.left-column');
        const rightColumn = element.querySelector('.right-column');
        
        // 1. Clone the content of the left column
        leftColumnContent = leftColumn.cloneNode(true);
        
        // 2. Create a temporary container for the left column content
        const tempContainer = document.createElement('div');
        tempContainer.id = 'temp-left-content';
        
        // For Template 3 (Executive Strip) and Template 10 (Orange Highlight), the top bar content is already handled/hidden by CSS.
        // We only move the "Skills" and "Languages" for these templates to keep them visible in the single column body.
        if (element.classList.contains('template-style-3') || element.classList.contains('template-style-10')) {
             tempContainer.appendChild(leftColumnContent.querySelector('.skills-section'));
             tempContainer.appendChild(leftColumnContent.querySelector('.extra-section'));
        } 
        // For other single column templates (2, 5, 7), move Contact, Skills, and Languages.
        else {
            tempContainer.appendChild(leftColumnContent.querySelector('.contact-section'));
            tempContainer.appendChild(leftColumnContent.querySelector('.skills-section'));
            tempContainer.appendChild(leftColumnContent.querySelector('.extra-section'));
        }

        // 3. Prepend the temporary content to the right column
        rightColumn.prepend(tempContainer);
        
        // 4. Add a separator line after the contact/skills section for better readability in single column PDF
        tempContainer.style.marginBottom = '20px';
        tempContainer.style.borderBottom = '1px solid #ddd';
        tempContainer.style.paddingBottom = '15px';
        
        // Also ensure headers are visible by copying h3 styles (only for T2, T5, T7)
        if (element.classList.contains('template-style-2') || element.classList.contains('template-style-5') || element.classList.contains('template-style-7')) {
             tempContainer.querySelectorAll('h3').forEach(h3 => {
                 h3.style.color = '#000';
                 h3.style.borderBottom = '2px solid var(--primary-color)';
                 h3.style.marginTop = '15px';
             });
        }
    }
    // --- END OF CRITICAL FIX ---


    // PDF Settings (FIXED to ensure full A4 and no cutting)
    const opt = {
        margin: [10, 10, 10, 10], 
        filename: `${name.replace(/\s/g, '_')}_CV.pdf`, 
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,     
            useCORS: true, 
            scrollY: 0,
            allowTaint: true,
            width: 794,       
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, 
        pagebreak: { mode: 'avoid-all' }
    };

    // Add CSS class before download (style.css mein defined hai: .pdf-downloading)
    element.classList.add('pdf-downloading');

    // Generate and Download
    html2pdf().from(element).set(opt).save().finally(function() {
        // --- CLEANUP AFTER PDF GENERATION ---
        
        // 1. Remove CSS class after download
        element.classList.remove('pdf-downloading');
        
        // 2. Remove the temporary content if it was added
        if (isSingleColumn) {
            const tempContainer = element.querySelector('#temp-left-content');
            if (tempContainer) {
                tempContainer.remove();
            }
        }
        
        // 3. Restore button state
        downloadBtn.innerText = "📥 Download PDF";
        downloadBtn.disabled = false;
        alert('Your CV has been downloaded!');
        
        // 4. Re-run updateCV to ensure screen view is correct after cleanup
        updateCV();
    });
}


/*
====================================
 4. TEMPLATE SELECTION LOGIC (Working Fine)
====================================
*/

/**
 * Shows the Template Selection Screen and hides the Builder.
 */
function showTemplateSelector() {
    document.getElementById('template-selector-screen').style.display = 'flex';
    document.getElementById('main-builder-area').style.display = 'none';
    
    if (document.getElementById('cv-output-area').className.includes('template-style-')) {
        document.getElementById('back-to-builder-btn').style.display = 'block';
    }
}

/**
 * Shows the Builder Area (Input Form and CV Preview) and hides the Template Selector.
 */
function showBuilder() {
    document.getElementById('template-selector-screen').style.display = 'none';
    document.getElementById('main-builder-area').style.display = 'flex';
    document.getElementById('back-to-builder-btn').style.display = 'none';
    
    updateCV();
}


/**
 * Selects a template, updates the CV, and switches to the builder view.
 * @param {string} templateClass - The new class name for the CV (e.g., 'template-style-2').
 * @param {string} themeColor - The primary color for this template.
 */
function selectTemplate(templateClass, themeColor) {
    const cvOutput = document.getElementById('cv-output-area');
    const colorPicker = document.getElementById('colorPicker');
    
    // 1. Remove all existing template classes
    const currentClasses = Array.from(cvOutput.classList);
    currentClasses.forEach(className => {
        if (className.startsWith('template-style-')) {
            cvOutput.classList.remove(className);
        }
    });

    // 2. Add the new template class
    cvOutput.classList.add(templateClass);
    
    // 3. Update the Theme Color picker and apply the new color
    colorPicker.value = themeColor;
    changeThemeColor(themeColor);
    
    // 4. Switch to the Builder View
    showBuilder(); 
    
    // 5. Update CV with the new style and color
    updateCV();
}


// FIX: Initial DOMContentLoaded logic to ensure the Template Selector screen is shown first.
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with default template
    selectTemplate('template-style-1', '#A52A2A');
    
    // FORCEFULLY SHOW THE TEMPLATE SELECTOR SCREEN ON PAGE LOAD
    showTemplateSelector(); 
    
    updateCV();
});
