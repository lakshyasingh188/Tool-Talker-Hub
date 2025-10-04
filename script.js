function generateResume() {
  // Photo upload
  const photo = document.getElementById("photo").files[0];
  if (photo) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("previewPhoto").src = e.target.result;
    }
    reader.readAsDataURL(photo);
  }

  // Text fields
  document.getElementById("previewName").innerText = document.getElementById("name").value || "Your Name";
  document.getElementById("previewJob").innerText = document.getElementById("job").value || "Your Job Title";
  document.getElementById("previewEmail").innerText = document.getElementById("email").value || "";
  document.getElementById("previewPhone").innerText = document.getElementById("phone").value || "";
  document.getElementById("previewAddress").innerText = document.getElementById("address").value || "";
  document.getElementById("previewProfile").innerText = document.getElementById("profile").value || "";
  document.getElementById("previewExperience").innerText = document.getElementById("experience").value || "";
  document.getElementById("previewEducation").innerText = document.getElementById("education").value || "";

  // Skills
  let skillsInput = document.getElementById("skills").value;
  let skillsArray = skillsInput.split(",");
  let skillsList = "";
  skillsArray.forEach(skill => {
    if(skill.trim() !== "") {
      skillsList += "<li>" + skill.trim() + "</li>";
    }
  });
  document.getElementById("previewSkills").innerHTML = skillsList;
}

function downloadPDF() {
  const element = document.getElementById("resumeContent");
  const opt = {
    margin: 10,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
