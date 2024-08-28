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

    // Show info-box and buttons
    document.getElementById('info-box').style.display = 'block';
    document.getElementById('certificate-buttons').style.display = 'flex'; // Ensure flex display for buttons

    // LinkedIn share button event
    document.getElementById('linkedin-share-button').addEventListener('click', () => {
        const shareUrl = `https://api.linkedin.com/v2/ugcPosts`;
        const accessToken = 'AQUM_vJ-7pXejqCHBK4nOC9aibb3OZYkTxRwBVn_sqlo0-V8tc-0H84-lpwTrIk7nJdT6VTrU80pfMVreDoxsAYXAuTj3EWhgo6yX4622aepW576AUr5qi4u0B0GwydqJafReSf9FixWwKhhqUgMgxdb4675ksUEJcroQuqejRw0t6ETVSdUpUl8E3_Q-u_gp33pq13pDC3CFTOhb6YilgEEQA5T7fW2Pbhj9csgPWf8Vaw2C1qnYNov0DMMNUJjnUi0ohAEKRC3jYWJiLsuXjg5QSq3EAd2WdiOCiqNRVr89ATpPNM7s2cCC3W70nDnzTK13xQCJV5rvVbly3_GyyCBknW4uw'; // Replace with your access token
        const userId = 'abdoullah-alalgui-59b11829b'; // Replace with your LinkedIn profile ID

        const postData = {
            author: `urn:li:person:${userId}`,
            lifecycleState: 'PUBLISHED',
            specificContent: {
                'com.linkedin.ugc.ShareContent': {
                    shareContent: {
                        shareMediaCategory: 'IMAGE',
                        media: [
                            {
                                status: 'READY',
                                originalUrl: certificate.imageUrl,
                                description: {
                                    text: certificate.message
                                }
                            }
                        ],
                        text: {
                            text: certificate.message
                        }
                    },
                    shareCommentary: {
                        text: certificate.message
                    }
                }
            },
            visibility: {
                'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
            }
        };

        fetch(shareUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Post shared:', data);
        })
        .catch(error => {
            console.error('Error sharing post:', error);
        });
    });
} else {
    document.getElementById('verification-message').innerText = 'Invalid Certificate!';
    document.getElementById('info-box').style.display = 'none';
    document.getElementById('certificate-buttons').style.display = 'none'; // Hide buttons for invalid certificates
}
