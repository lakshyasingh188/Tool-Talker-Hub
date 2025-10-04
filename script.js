function setTemplate(template) {
  document.getElementById("resumeContent").className = template;
}

function generateResume() {
  document.getElementById("previewName").innerText = document.getElementById("name").value || "Your Name";
  document.getElementById("previewEmail").innerText = document.getElementById("email").value || "example@email.com";
  document.getElementById("previewPhone").innerText = document.getElementById("phone").value || "1234567890";

  let class10 = `${document.getElementById("class10Board").value || "-"}, ${document.getElementById("class10Year").value || "-"}, ${document.getElementById("class10Marks").value || "-"}`;
  let class12 = `${document.getElementById("class12Board").value || "-"}, ${document.getElementById("class12Year").value || "-"}, ${document.getElementById("class12Marks").value || "-"}`;
  let bachelor = `${document.getElementById("bachelorCollege").value || "-"}, ${document.getElementById("bachelorYear").value || "-"}, ${document.getElementById("bachelorMarks").value || "-"}`;

  document.getElementById("previewClass10").innerText = class10;
  document.getElementById("previewClass12").innerText = class12;
  document.getElementById("previewBachelor").innerText = bachelor;

  document.getElementById("previewSkills").innerText = document.getElementById("skills").value || "Problem Solving, Team Work";
  document.getElementById("previewLanguages").innerText = document.getElementById("languages").value || "English, Hindi";

  let objective = document.getElementById("objective").value;
  if (!objective) {
    objective = "I am a motivated individual eager to contribute skills and grow with the organization.";
  }
  document.getElementById("previewObjective").innerText = objective;
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
  html2pdf().from(element).set(opt).save();
}
