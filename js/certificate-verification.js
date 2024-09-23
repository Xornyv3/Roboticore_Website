// Get the 'id' parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const validCertificates = {
    'Mehdi-Bahlaoui': {
        message: 'Certificate for Mehdi Bahlaoui is Verified',
        imageUrl: 'img/mehdi.jpg',
    },
    'Abdoullah-Alalgui': {
        message: 'Certificate for Abdoullah Alalgui is Verified',
        imageUrl: 'img/abdo.jpeg',
    },
    // Add more names as needed
};

// Check if the ID matches any valid certificate
if (validCertificates[id]) {
    const certificate = validCertificates[id];
    const verificationMessage = document.getElementById('verification-message');

    // Set the message and assign a new ID for valid certificates
    verificationMessage.innerText = certificate.message;
    verificationMessage.id = 'verified-certificate';

    document.getElementById('certificate-image').src = certificate.imageUrl;

    // Set the download link
    const downloadButton = document.getElementById('download-button');
    downloadButton.href = certificate.imageUrl;

    // Set LinkedIn button action to open Certifications and Licenses page
    const linkedinButton = document.getElementById('linkedin-button');
    linkedinButton.addEventListener('click', function() {
        // Open the LinkedIn Certification and Licenses page
        const linkedInCertificationUrl = 'https://www.linkedin.com/in/me/edit/forms/certification/new/?profileFormEntryPoint=PROFILE_COMPLETION_HUB';

        // Attempt to open the URL in a new tab
        const newWindow = window.open(linkedInCertificationUrl, '_blank');

        // If the new window was blocked by the browser, notify the user
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            alert('Please allow pop-ups for this site to add your certificate.');
        } else {
            // Provide instructions for filling out the form
            alert(`To add your certificate:\n\n1. Enter the Name: Arduino Certificate\n2. Enter the Company: RobotiCore Club\n3. Enter your ID: ${id}\n4. Copy this URL and paste it in the "Diploma URL"\n5. Download the certificate image and add it as Media.\n6. Click Save.\n\nNote: If LinkedIn doesn't open your page, please make sure you are signed in or connected to LinkedIn first.`);
        }
    });

    // Show info-box and buttons
    document.getElementById('info-box').style.display = 'block';
    document.getElementById('certificate-buttons').style.display = 'flex'; // Ensure flex display for buttons
} else {
    const verificationMessage = document.getElementById('verification-message');

    // Set the message and assign a new ID for invalid certificates
    verificationMessage.innerText = 'Invalid Certificate!';
    verificationMessage.id = 'invalid-certificate';

    document.getElementById('info-box').style.display = 'none';
    document.getElementById('certificate-buttons').style.display = 'none'; // Hide buttons for invalid certificates
}
