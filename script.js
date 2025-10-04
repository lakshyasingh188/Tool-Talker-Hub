function setTemplate(templateName) {
  alert("Template selected: " + templateName);
}

function generateResume() {
  // Quick update (speed) -> no delay
  document.getElementById("previewName").innerText = document.getElementById("name").value || "Your Name";
  document.getElementById("previewEmail").innerText = document.getElementById("email").value || "example@email.com";
  document.getElementById("previewPhone").innerText = document.getElementById("phone").value || "1234567890";

  // Education
  let class10 = `${document.getElementById("class10Board").value || "Board"} / ${document.getElementById("class10Year").value || "Year"} / ${document.getElementById("class10Marks").value || "%"}`;
  let class12 = `${document.getElementById("class12Board").value || "Board"} / ${document.getElementById("class12Year").value || "Year"} / ${document.getElementById("class12Marks").value || "%"}`;
  let bachelor = `${document.getElementById("bachelorCollege").value || "College"} / ${document.getElementById("bachelorYear").value || "Year"} / ${document.getElementById("bachelorMarks").value || "%"}`;

  document.getElementById("previewClass10").innerText = class10;
  document.getElementById("previewClass12").innerText = class12;
  document.getElementById("previewBachelor").innerText = bachelor;

  // Skills
  document.getElementById("previewSkills").innerText = document.getElementById("skills").value || "Problem Solving, Team Work, Communication";

  // Languages
  document.getElementById("previewLanguages").innerText = document.getElementById("languages").value || "English, Hindi";

  // Objective (auto paragraph if empty)
  let objective = document.getElementById("objective").value;
  if (!objective) {
    objective = "I am a hardworking individual who is eager to contribute my skills and grow with your organization. I believe in learning continuously and working with dedication to achieve the company’s goals.";
  }
  document.getElementById("previewObjective").innerText = objective;
}
