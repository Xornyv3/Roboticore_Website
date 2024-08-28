// Get the 'id' parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const validCertificates = {
    'JohnDoe': {
        message: 'Certificate for John Doe is Verified!',
        imageUrl: 'path_to_johndoe_image.jpg',
    },
    'Mehdi-Bahlaoui': {
        message: 'Certificate for Mehdi Bahlaoui is Verified!',
        imageUrl: 'path_to_mehdi_image.jpg',
    },
    'Abdoullah-Alalgui': {
        message: 'Certificate for Abdoullah Alalgui is Verified!',
        imageUrl: 'img/abdo.jpeg',
    },
    // Add more names as needed
};

// Check if the ID matches any valid certificate
if (validCertificates[id]) {
    const certificate = validCertificates[id];
    document.getElementById('verification-message').innerText = certificate.message;
    document.getElementById('certificate-image').src = certificate.imageUrl;

    // Set the download link
    const downloadButton = document.getElementById('download-button');
    downloadButton.href = certificate.imageUrl;

    // Set LinkedIn share URL
    const linkedinButton = document.getElementById('linkedin-button');
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=Check%20out%20my%20certificate&summary=I%20have%20completed%20the%20certificate%20course&source=`;
    linkedinButton.href = linkedinShareUrl;

    // Show info-box and buttons
    document.getElementById('info-box').style.display = 'block';
    document.getElementById('certificate-buttons').style.display = 'flex'; // Ensure flex display for buttons
} else {
    document.getElementById('verification-message').innerText = 'Invalid Certificate!';
    document.getElementById('info-box').style.display = 'none';
    document.getElementById('certificate-buttons').style.display = 'none'; // Hide buttons for invalid certificates
}
