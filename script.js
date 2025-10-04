function generateResume() {
  document.getElementById("previewName").innerText = document.getElementById("name").value;
  document.getElementById("previewEmail").innerText = document.getElementById("email").value;
  document.getElementById("previewPhone").innerText = document.getElementById("phone").value;
  document.getElementById("previewEducation").innerText = document.getElementById("education").value;
  document.getElementById("previewSkills").innerText = document.getElementById("skills").value;
  document.getElementById("previewLanguages").innerText = document.getElementById("languages").value;
  document.getElementById("previewObjective").innerText = document.getElementById("objective").value;
}

function downloadPDF() {
  const element = document.getElementById("resumeContent");
  const opt = {
    margin: 0,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
