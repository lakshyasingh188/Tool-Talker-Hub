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
    color: #ccc;
    font-size: 0.7em;
}
.rating::after {
    content: '● ● ● ● ●'; 
    position: absolute;
    overflow: hidden;
    width: calc(var(--rating) / 5 * 100%); 
    color: var(--accent-color); 
    font-size: 0.7em;
}

/* Right Column Styling */
.right-column {
    padding: 40px;
}

.right-column h3 {
    color: var(--primary-color);
    font-size: 1.5em;
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
    margin-top: 0;
    margin-bottom: 15px;
}

/* Work History */
.job-item {
    margin-bottom: 25px;
}
.job-duration {
    font-size: 0.8em;
    font-style: italic;
    color: #888;
    margin: 0;
}
.job-title {
    font-size: 1.1em;
    color: var(--primary-color);
    margin: 5px 0;
}
.job-company {
    font-size: 0.9em;
    margin: 0 0 10px 0;
}
.job-tasks {
    padding-left: 20px;
    margin-top: 5px;
    font-size: 0.9em;
}

/* Education */
.edu-item {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #eee;
}
.edu-item:last-child {
    border-bottom: none;
}
.edu-duration {
    font-size: 0.8em;
    font-style: italic;
    color: #888;
    margin: 0;
}
.edu-title {
    font-size: 1.1em;
    color: var(--primary-color);
    margin: 5px 0;
}
.edu-institution {
    font-size: 0.9em;
    margin: 0 0 5px 0;
}

/* Filler Content Styling */
.project-item {
    margin-bottom: 15px;
}
.project-title {
    font-size: 1em;
    color: var(--primary-color);
    margin: 5px 0;
}
.project-details {
    font-size: 0.9em;
    margin: 0;
}

/*
====================================
  3. PDF Print Styles
====================================
*/
@media print {
    body {
        padding: 0;
        margin: 0;
        background: none;
        display: block;
    }

    .container, .input-form {
        display: none;
    }
    
    .cv-paper {
        margin: 0;
        box-shadow: none;
        width: 100%;
        min-height: auto;
    }
}
