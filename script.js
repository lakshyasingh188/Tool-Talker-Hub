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
function generateResume() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value;
  const experience = document.getElementById("experience").value;

  document.getElementById("resumeOutput").innerHTML = `
    <div style="background:#fff; padding:20px; border-radius:10px; margin-top:20px; box-shadow:0px 4px 10px rgba(0,0,0,0.1)">
      <h1>${name}</h1>
      <p>Email: ${email} | Phone: ${phone}</p>
      <hr>
      <h2>Education</h2>
      <p>${education}</p>
      <h2>Skills</h2>
      <p>${skills}</p>
      <h2>Experience</h2>
      <p>${experience}</p>
      <button onclick="downloadPDF()">Download as PDF</button>
    </div>
  `;
}
</script>

