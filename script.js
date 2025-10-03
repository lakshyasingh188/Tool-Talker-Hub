// Resume Form Handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeForm");
  const output = document.getElementById("resumeOutput");

  // Load saved data (LocalStorage)
  let savedData = JSON.parse(localStorage.getItem("resumeData"));
  if (savedData) {
    document.getElementById("name").value = savedData.name;
    document.getElementById("email").value = savedData.email;
    document.getElementById("phone").value = savedData.phone;
    document.getElementById("skills").value = savedData.skills;
  }

  // On form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let skills = document.getElementById("skills").value;

    // Show Resume Output
    output.innerHTML = `
      <div class="resume">
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
      </div>
    `;

    // Save data to LocalStorage
    localStorage.setItem("resumeData", JSON.stringify({ name, email, phone, skills }));
  });
});
