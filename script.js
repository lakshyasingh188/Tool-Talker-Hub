function setTemplate(templateName) {
  alert("Template selected: " + templateName);
}

function generateResume() {
  document.getElementById("previewName").innerText = document.getElementById("name").value;
  document.getElementById("previewEmail").innerText = document.getElementById("email").value;
  document.getElementById("previewPhone").innerText = document.getElementById("phone").value;
  document.getElementById("previewClass10").innerText = document.getElementById("class10").value;
  document.getElementById("previewClass12").innerText = document.getElementById("class12").value;
  document.getElementById("previewBachelor").innerText = document.getElementById("bachelor").value;
  document.getElementById("previewSkills").innerText = document.getElementById("skills").value;
  document.getElementById("previewLanguages").innerText = document.getElementById("languages").value;
  document.getElementById("previewObjective").innerText = document.getElementById("objective").value;
}
