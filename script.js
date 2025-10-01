function generateResume(data) {
  return `
    <h1>${data.name}</h1>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Phone:</b> ${data.phone}</p>
    <h3>Education</h3>
    <p>${data.education}</p>
    <h3>Skills</h3>
    <p>${data.skills}</p>
    <h3>Experience</h3>
    <p>${data.experience}</p>
  `;
}

document.getElementById("resumeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    education: document.getElementById("education").value,
    skills: document.getElementById("skills").value,
    experience: document.getElementById("experience").value
  };

  document.getElementById("resumeContent").innerHTML = generateResume(data);
  document.getElementById("output").style.display = "block";
});

function downloadPDF() {
  let element = document.getElementById("resumeContent");
  let opt = {
    margin: 0.5,
    filename: 'resume.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
}
<script>
function downloadPDF() {
  const element = document.getElementById("resumeOutput");
  html2pdf().from(element).save("Resume.pdf");
}
</script>

