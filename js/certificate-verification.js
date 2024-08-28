// Function to post content to LinkedIn (make sure to call this after getting access token)
function postToLinkedIn(certificateImageUrl) {
    const accessToken = localStorage.getItem('linkedin_access_token');
    
    if (!accessToken) {
        console.error('Access token not found');
        return;
    }

    fetch('https://api.linkedin.com/v2/shares', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify({
            content: {
                contentEntities: [
                    {
                        entityLocation: certificateImageUrl,
                        thumbnail: {
                            resolvedUrl: certificateImageUrl
                        }
                    }
                ],
                title: 'Certificate Verification',
                description: 'Check out this certificate verification image.'
            },
            distribution: {
                linkedInDistributionTarget: {}
            },
            owner: 'urn:li:person:{your_person_urn}', // Replace with actual person URN
            subject: 'Certificate Verification',
            text: {
                text: 'Here is my verified certificate!'
            }
        })
    })
    .then(response => response.json())
    .then(data => console.log('Post Success:', data))
    .catch(error => console.error('Post Error:', error));
}

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

    // LinkedIn OAuth Authorization
    const clientId = '78ej28syhnc6oh';
    const redirectUri = encodeURIComponent('https://xornyv3.github.io/Roboticore_Website/redirect.html'); // Your redirect URI
    const state = encodeURIComponent(id); // Pass the certificate ID as state

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;

    const linkedinButton = document.getElementById('linkedin-button');
    linkedinButton.href = authUrl;

    // Show info-box and buttons
    document.getElementById('info-box').style.display = 'block';
    document.getElementById('certificate-buttons').style.display = 'flex'; // Ensure flex display for buttons
} else {
    document.getElementById('verification-message').innerText = 'Invalid Certificate!';
    document.getElementById('info-box').style.display = 'none';
    document.getElementById('certificate-buttons').style.display = 'none'; // Hide buttons for invalid certificates
}

// Check for LinkedIn code in redirect
const redirectUrlParams = new URLSearchParams(window.location.search);
const code = redirectUrlParams.get('code');
const state = redirectUrlParams.get('state');

if (code) {
    const clientId = '78ej28syhnc6oh';
    const clientSecret = 'MkOnibH8qfkQMxOK';
    const redirectUri = 'https://xornyv3.github.io/Roboticore_Website/redirect.html';

    fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code, // The code you received from LinkedIn
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Access Token:', data.access_token);
        localStorage.setItem('linkedin_access_token', data.access_token);
        window.location.href = `https://xornyv3.github.io/Roboticore_Website/?id=${state}`;
    })
    .catch(error => console.error('Access Token Error:', error));
}
