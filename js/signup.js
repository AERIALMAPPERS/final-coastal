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

// Signup route
router.post('/', async (req, res) => {
    const { username, password, email, mobile, authority, authority_name, state } = req.body;

    // Check if all required fields are provided
    if (!username || !password || !email || !mobile || !authority || !authority_name || !state) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert new user with all fields including 'state'
        const sql = `INSERT INTO users (username, password, email, mobile, authority, authority_name, state) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

        // Execute the query
        await connection.promise().query(sql, [username, hashedPassword, email, mobile, authority, authority_name, state]);

        res.status(201).json({ message: 'account created successfully' });
    } catch (err) {
        console.error('Error during signup:', err); // Logs the full error
        res.status(500).json({ message: 'Server error during signup' });
    }
});

module.exports = router;
