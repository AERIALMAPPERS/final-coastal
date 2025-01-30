const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
require('dotenv').config();

const router = express.Router();

// MySQL Database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Signup route - Create new user
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Check if username already exists
        const [rows] = await connection.promise().query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

        // Insert new user into the database
        await connection.promise().query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: 'Server error during signup' });
    }
});

module.exports = router;
