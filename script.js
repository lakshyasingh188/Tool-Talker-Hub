// Resume Builder App JS
document.addEventListener("DOMContentLoaded", () => {
  // elements
  const templateSelect = document.getElementById("templateSelect");
  const photoInput = document.getElementById("photoInput");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const class10Input = document.getElementById("class10");
  const class12Input = document.getElementById("class12");
  const collegeInput = document.getElementById("college");
  const skillsInput = document.getElementById("skills");
  const experienceInput = document.getElementById("experience");

  const generateBtn = document.getElementById("generateBtn");
  const downloadPdfBtn = document.getElementById("downloadPdfBtn");
  const saveBtn = document.getElementById("saveBtn");
  const clearBtn = document.getElementById("clearBtn");

  const preview = document.getElementById("resumePreview");

  // hold photo data url
  let photoDataUrl = null;

  // load saved data if exists
  function loadSaved() {
    const saved = JSON.parse(localStorage.getItem("resumeData"));
    if (!saved) return;
    templateSelect.value = saved.template || "template1";
    nameInput.value = saved.name || "";
    emailInput.value = saved.email || "";
    phoneInput.value = saved.phone || "";
    class10Input.value = saved.class10 || "";
    class12Input.value = saved.class12 || "";
    collegeInput.value = saved.college || "";
    skillsInput.value = saved.skills || "";
    experienceInput.value = saved.experience || "";
    photoDataUrl = saved.photo || null;
    if (photoDataUrl) {
      // nothing to do, preview will show when generate clicked
    }
  }
  loadSaved();

  // Photo upload -> read as data URL
  photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      photoDataUrl = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Build data object
  function getFormData() {
    return {
      template: templateSelect.value,
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      class10: class10Input.value.trim(),
      class12: class12Input.value.trim(),
      college: collegeInput.value.trim(),
      skills: skillsInput.value.trim(),
      experience: experienceInput.value.trim(),
      photo: photoDataUrl,
    };
  }

  // Render selected template into preview
  function renderTemplate(data) {
    if (!data) data = getFormData();
    const t = data.template || "template1";

    // common header html for many templates
    const photoHtml = data.photo ? `<img class="resume-photo" src="${data.photo}" alt="photo">` : `<div style="width:110px;height:110px;border-radius:50%;background:#e9ecef;display:inline-block;"></div>`;
    const contactHtml = `<div class="resume-contact"><div><strong>Email:</strong> ${escapeHtml(data.email || "")}</div><div><strong>Phone:</strong> ${escapeHtml(data.phone || "")}</div></div>`;

    // create HTML per template
    let html = "";

    if (t === "template1") { // modern
      html = `
        <div class="template-modern">
          <div class="resume-header">
            ${photoHtml}
            <div>
              <div class="resume-name">${escapeHtml(data.name || "Your Name")}</div>
              ${contactHtml}
            </div>
          </div>
          <div class="section-title">Education</div>
          <div>${escapeHtml(data.class12 || "")}</div>
          <div>${escapeHtml(data.class10 || "")}</div>
          <div>${escapeHtml(data.college || "")}</div>
          <div class="section-title">Skills</div>
          <div>${escapeHtml(data.skills || "")}</div>
          <div class="section-title">Experience</div>
          <div>${escapeHtml(data.experience || "")}</div>
        </div>`;
    } else if (t === "template2") { // professional
      html = `
        <div class="template-professional">
          <div style="text-align:center;">
            ${photoHtml}
            <div class="resume-name">${escapeHtml(data.name || "")}</div>
            ${contactHtml}
          </div>
          <hr>
          <div><strong>Education</strong>
            <div>${escapeHtml(data.college || "")}</div>
            <div>${escapeHtml(data.class12 || "")}</div>
            <div>${escapeHtml(data.class10 || "")}</div>
          </div>
          <div><strong>Skills</strong><div>${escapeHtml(data.skills || "")}</div></div>
          <div><strong>Experience</strong><div>${escapeHtml(data.experience || "")}</div></div>
        </div>`;
    } else if (t === "template3") { // minimal
      html = `
        <div class="template-minimal">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div class="resume-name">${escapeHtml(data.name || "")}</div>
              ${contactHtml}
            </div>
          </div>
          <hr>
          <div><strong>Education</strong><div>${escapeHtml(data.college || "")} ${escapeHtml(data.class12 || "")} ${escapeHtml(data.class10 || "")}</div></div>
          <div><strong>Skills</strong><div>${escapeHtml(data.skills || "")}</div></div>
        </div>`;
    } else if (t === "template4") { // clean
      html = `
        <div class="template-clean">
          <div class="resume-header">
            <div>
              <div class="resume-name">${escapeHtml(data.name || "")}</div>
              ${contactHtml}
            </div>
            ${photoHtml}
          </div>
          <div class="section-title">Summary</div>
          <div>${escapeHtml(data.experience || "")}</div>
          <div class="section-title">Skills</div>
          <div>${escapeHtml(data.skills || "")}</div>
        </div>`;
    } else if (t === "template5") { // creative
      html = `
        <div class="template-creative">
          <div style="display:flex;gap:12px;">
            ${photoHtml}
            <div>
              <div class="resume-name">${escapeHtml(data.name || "")}</div>
              ${contactHtml}
            </div>
          </div>
          <div class="section-title">Education & Qualifications</div>
          <div>${escapeHtml(data.college || "")}</div>
          <div>${escapeHtml(data.class12 || "")}</div>
          <div>${escapeHtml(data.class10 || "")}</div>
          <div class="section-title">Skills</div>
          <div>${escapeHtml(data.skills || "")}</div>
        </div>`;
    } else if (t === "template6") { // classic
      html = `
        <div class="template-classic">
          <div class="resume-name">${escapeHtml(data.name || "")}</div>
          <div>${contactHtml}</div>
          <hr>
          <div><strong>Education</strong><div>${escapeHtml(data.college || "")}<br>${escapeHtml(data.class12 || "")}<br>${escapeHtml(data.class10 || "")}</div></div>
          <div><strong>Experience</strong><div>${escapeHtml(data.experience || "")}</div></div>
        </div>`;
    } else if (t === "template7") { // elegant
      html = `
        <div class="template-elegant">
          <div class="resume-header">
            ${photoHtml}
            <div>
              <div class="resume-name">${escapeHtml(data.name || "")}</div>
              ${contactHtml}
            </div>
          </div>
          <div class="section-title">Highlights</div>
          <div>${escapeHtml(data.skills || "")}</div>
          <div class="section-title">Experience</div>
          <div>${escapeHtml(data.experience || "")}</div>
        </div>`;
    } else if (t === "template8") { // one column
      html = `
        <div class="template-onecol">
          <div class="resume-name">${escapeHtml(data.name || "")}</div>
          ${contactHtml}
          <div class="section-title">Education</div>
          <div>${escapeHtml(data.college || "")}<br>${escapeHtml(data.class12 || "")}<br>${escapeHtml(data.class10 || "")}</div>
          <div class="section-title">Skills</div>
          <div>${escapeHtml(data.skills || "")}</div>
        </div>`;
    } else if (t === "template9") { // two-col
      html = `
        <div class="template-twocol">
          <div class="left-col">
            <div class="resume-name">${escapeHtml(data.name || "")}</div>
            ${contactHtml}
            <div class="section-title">Skills</div>
            <div>${escapeHtml(data.skills || "")}</div>
          </div>
          <div>
            <div class="section-title">Experience</div>
            <div>${escapeHtml(data.experience || "")}</div>
            <div class="section-title">Education</div>
            <div>${escapeHtml(data.college || "")}<br>${escapeHtml(data.class12 || "")}<br>${escapeHtml(data.class10 || "")}</div>
          </div>
        </div>`;
    } else if (t === "template10") { // sidebar
      html = `
        <div class="template-sidebar">
          <div class="sidebar">
            ${photoHtml}
            <div style="margin-top:8px;"><strong>Contact</strong><div>${escapeHtml(data.email || "")}</div><div>${escapeHtml(data.phone || "")}</div></div>
            <div class="section-title">Skills</div>
            <div>${escapeHtml(data.skills || "")}</div>
          </div>
          <div>
            <div class="resume-name">${escapeHtml(data.name || "")}</div>
            <div class="section-title">Experience</div>
            <div>${escapeHtml(data.experience || "")}</div>
            <div class="section-title">Education</div>
            <div>${escapeHtml(data.college || "")}<br>${escapeHtml(data.class12 || "")}<br>${escapeHtml(data.class10 || "")}</div>
          </div>
        </div>`;
    }

    preview.innerHTML = html;
  }

  // escape to avoid accidental HTML injection
  function escapeHtml(unsafe) {
    if (!unsafe) return "";
    return String(unsafe)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'", "&#039;");
  }

  // Generate preview on button click
  generateBtn.addEventListener("click", () => {
    const data = getFormData();
    renderTemplate(data);
  });

  // Save to localStorage
  saveBtn.addEventListener("click", () => {
    const data = getFormData();
    localStorage.setItem("resumeData", JSON.stringify(data));
    alert("Saved to browser. You can continue later.");
  });

  // Clear saved
  clearBtn.addEventListener("click", () => {
    if (confirm("Clear saved data?")) {
      localStorage.removeItem("resumeData");
      alert("Cleared.");
    }
  });

  // Download as PDF - ensure preview generated
  downloadPdfBtn.addEventListener("click", () => {
    // ensure preview is generated
    const data = getFormData();
    renderTemplate(data);

    // small delay to render
    setTimeout(() => {
      // select element to convert
      const element = document.getElementById("resumePreview");
      // use html2pdf to save with reasonable options
      const opt = {
        margin:       [0.2,0.2,0.2,0.2],
        filename:     `${(data.name || "resume").replace(/\s+/g,"_")}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }, 300);
  });

  // Save on unload automatically
  window.addEventListener("beforeunload", () => {
    const data = getFormData();
    localStorage.setItem("resumeData", JSON.stringify(data));
  });

  // Pre-render if saved data exists
  if (localStorage.getItem("resumeData")) {
    renderTemplate(JSON.parse(localStorage.getItem("resumeData")));
  }
});
