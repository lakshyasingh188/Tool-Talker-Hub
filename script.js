function generateResume() {
  // Basic Info
  document.getElementById("previewName").innerText = document.getElementById("name").value || "Your Name";
  document.getElementById("previewEmail").innerText = document.getElementById("email").value || "example@email.com";
  document.getElementById("previewPhone").innerText = document.getElementById("phone").value || "1234567890";

  // Education
  document.getElementById("previewClass10").innerText =
    "Class 10: " +
    (document.getElementById("class10Board").value || "-") + ", " +
    (document.getElementById("class10Year").value || "-") + ", " +
    (document.getElementById("class10Marks").value || "-");

  document.getElementById("previewClass12").innerText =
    "Class 12: " +
    (document.getElementById("class12Board").value || "-") + ", " +
    (document.getElementById("class12Year").value || "-") + ", " +
    (document.getElementById("class12Marks").value || "-");

  document.getElementById("previewBachelor").innerText =
    "Bachelor: " +
    (document.getElementById("bachelorCollege").value || "-") + ", " +
    (document.getElementById("bachelorYear").value || "-") + ", " +
    (document.getElementById("bachelorMarks").value || "-");

  // Skills
  document.getElementById("previewSkills").innerText =
    document.getElementById("skills").value || "Teamwork, Problem Solving, Communication";

  // Languages
  document.getElementById("previewLanguages").innerText =
    document.getElementById("languages").value || "English, Hindi";

  // Objective
  document.getElementById("previewObjective").innerText =
    document.getElementById("objective").value ||
    "I am a motivated and hardworking individual, eager to contribute my skills and grow with the organization.";
}

// Download PDF
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
