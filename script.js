function generateResume() {
  document.getElementById("previewName").innerText = document.getElementById("name").value || "Your Name";
  document.getElementById("previewEmail").innerText = document.getElementById("email").value ? "📧 " + document.getElementById("email").value : "";
  document.getElementById("previewPhone").innerText = document.getElementById("phone").value ? "📞 " + document.getElementById("phone").value : "";
  document.getElementById("previewAddress").innerText = document.getElementById("address").value ? "📍 " + document.getElementById("address").value : "";

  document.getElementById("previewEducation").innerText = document.getElementById("education").value;
  document.getElementById("previewExperience").innerText = document.getElementById("experience").value;

  // Skills list bana dena
  let skillsInput = document.getElementById("skills").value;
  let skillsArray = skillsInput.split(",");
  let skillsList = "";
  skillsArray.forEach(skill => {
    if(skill.trim() !== "") {
      skillsList += "<li>" + skill.trim() + "</li>";
    }
  });
  document.getElementById("previewSkills").innerHTML = skillsList;

  document.getElementById("previewLanguages").innerText = document.getElementById("languages").value;
  document.getElementById("previewObjective").innerText = document.getElementById("objective").value;
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
