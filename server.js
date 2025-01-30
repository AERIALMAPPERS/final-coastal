// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Initialize express app
const app = express();
const port = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, password, email, mobile, state, authority, authority_name } = req.body;

    // Validate input data
    if (!username || !password || !email || !mobile || !state || !authority || !authority_name) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into database
        const result = await connection.promise().query(
            "INSERT INTO users (username, password, email, mobile, state, authority, authority_name) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [username, hashedPassword, email, mobile, state, authority, authority_name]
        );

        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Error creating user" });
    }
});



// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Query the user from the database
        const [rows] = await connection.promise().query('SELECT * FROM users WHERE username = ?', [username]);
        
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = rows[0];

        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Login successful
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
});
/////feeedback//////
// API endpoint to handle form submission
// Feedback route
// Feedback route
app.post('/feedback', (req, res) => {
    const { username, email, feedback } = req.body;

    // Validate input fields
    if (!username || !email || !feedback) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // SQL query to insert feedback into the database
    const sql = 'INSERT INTO feedback (username, email, feedback) VALUES (?, ?, ?)';
    connection.query(sql, [username, email, feedback], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Feedback submitted successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });