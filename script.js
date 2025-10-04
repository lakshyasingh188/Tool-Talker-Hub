/**
 * 1. डेटा अपडेट फ़ंक्शन (Updates CV from form inputs)
 */
function updateCV() {
    // व्यक्तिगत विवरण अपडेट करें
    document.getElementById('cv-name').innerText = 
        document.getElementById('nameInput').value || 'Anika Kumar';
    
    document.getElementById('cv-title').innerText = 
        document.getElementById('titleInput').value || 'Teacher';

    document.getElementById('cv-phone').innerText = 
        document.getElementById('phoneInput').value || '+91 11 5555 5555';
    
    document.getElementById('cv-email').innerText = 
        document.getElementById('emailInput').value || 'anika@example.com';
    
    document.getElementById('cv-summary').innerText = 
        document.getElementById('summaryInput').value || 'Passionate teacher with experience developing and implementing diverse curriculum. Strong grasp of curriculum design and instructional strategies.';

    // नाम के पहले अक्षर (initials) अपडेट करें
    const name = document.getElementById('nameInput').value;
    let initials = 'AK';
    if (name) {
        const parts = name.split(' ');
        initials = parts.map(p => p.charAt(0).toUpperCase()).join('');
    }
    document.getElementById('initials-display').innerText = initials;


    // नोट: आपको कार्य अनुभव, शिक्षा और कौशल को डायनामिक बनाने के लिए
    // और ज़्यादा JavaScript कोड जोड़ना होगा, जिसमें आप Arrays का उपयोग करके
    // नए सेक्शन जोड़ सकते हैं (Advanced Task)।
}

// पेज लोड होने पर एक बार CV को सेट कर दें (फ़ॉर्म खाली होने पर भी डिफ़ॉल्ट डेटा दिखे)
document.addEventListener('DOMContentLoaded', updateCV);


/**
 * 2. PDF जनरेशन फ़ंक्शन
 */
function generatePDF() {
    const element = document.getElementById('cv-output-area'); // CV एरिया की ID

    // PDF सेटिंग्स (A4 साइज़, मार्जिन आदि)
    const opt = {
        margin:       0.5, // 0.5 इंच का मार्जिन
        filename:     'My_Professional_CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, // उच्च रिज़ॉल्यूशन के लिए स्केल
        jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
    };

    // html2pdf लाइब्रेरी का उपयोग करके PDF बनाएँ और डाउनलोड करें
    html2pdf().from(element).set(opt).save();
}
