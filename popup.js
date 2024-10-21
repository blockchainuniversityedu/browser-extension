document.addEventListener('publish-form').addEventListener('submit',
    function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;
        const links = document.getElementById('links').value.split(',');

        // Send the content to the backend
        fetch('https://localhost:3000/publish', { // Use your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, bopdy, links })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Post published:', data);
            alert('Content published successfully!');
        })
        .catch(error => console.error('Error publishing content:',
            error));
    });