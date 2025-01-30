// login.js

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login data to backend
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Login successful') {
            // localStorage.setItem("isLoggedIn", "true");
            // localStorage.setItem("username", username);

            alert('Login successful!');
            window.location.href = '/project_data.html'; // Redirect to the home page
        } else {
            alert(data.message); // Show error message from backend
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error logging in. Please try again later.');
    });
});
