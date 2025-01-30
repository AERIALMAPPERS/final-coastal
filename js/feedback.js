document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    // Validate the name, email, and feedback fields
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert('Please enter a valid name.');
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!feedback) {
        alert('Feedback cannot be empty.');
        return;
    }

    // Create the object to send as JSON
    const formData = {
        username: name,
        email: email,
        feedback: feedback
    };

    // Send the data to the backend API using fetch
    fetch('http://localhost:3000/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)  // Convert form data into JSON
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);  // Show the message from the backend
        document.getElementById('feedback-form').reset();  // Reset the form after successful submission
    })
    .catch(error => {
        alert('Error submitting feedback!');
        console.error(error);  // Log any error to the console for debugging
    });
});
