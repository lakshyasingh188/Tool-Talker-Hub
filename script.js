function generateCV() {
  // Personal Details
  const name = document.getElementById('nameInput').value;
  const phone = document.getElementById('phoneInput').value;
  const email = document.getElementById('emailInput').value;
  const address = document.getElementById('addressInput').value;
  const linkedin = document.getElementById('linkedinInput').value;
  const github = document.getElementById('githubInput').value;

  // Education
  const degree = document.getElementById('degreeInput').value;
  const college = document.getElementById('collegeInput').value;
  const board = document.getElementById('boardInput').value;
  const year = document.getElementById('yearInput').value;
  const percent = document.getElementById('percentInput').value;

  // Skills, Projects, Achievements
  const skills = document.getElementById('skillsInput').value.split(',');
  const projects = document.getElementById('projectsInput').value;
  const achievements = document.getElementById('achievementsInput').value.split(',');
  const languages = document.getElementById('languagesInput').value;
  const hobbies = document.getElementById('hobbiesInput').value;

  // Save to localStorage
  localStorage.setItem('cvData', JSON.stringify({
    name, phone, email, address, linkedin, github,
    degree, college, board, year, percent,
    skills, projects, achievements, languages, hobbies
  }));

  // Redirect to resume page
  window.location.href = 'resume.html';
}

// Resume Page Data Load
window.onload = () => {
  const data = JSON.parse(localStorage.getItem('cvData'));
  if (!data) return;

  document.getElementById('cv-name').innerText = data.name;
  document.getElementById('cv-contact').innerHTML = `
    📞 ${data.phone}<br>
    ✉️ ${data.email}<br>
    📍 ${data.address}<br>
    🔗 <a href="${data.linkedin}" target="_blank">${data.linkedin}</a><br>
    💻 <a href="${data.github}" target="_blank">${data.github}</a>
  `;

  // Skills
  const skillsList = document.getElementById('cv-skills');
  data.skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill.trim();
    skillsList.appendChild(li);
  });

  // Education
  document.getElementById('cv-education').innerHTML = `
    <b>${data.degree}</b><br>
    ${data.college}, ${data.board}<br>
    Year: ${data.year} | Percentage/CGPA: ${data.percent}
  `;

  // Projects
  document.getElementById('cv-projects').innerText = data.projects;

  // Achievements
  document.getElementById('cv-achievements').innerText = data.achievements.join(', ');

  // Languages & Hobbies
  document.getElementById('cv-languages').innerText = data.languages;
  document.getElementById('cv-hobbies').innerText = data.hobbies;
};
