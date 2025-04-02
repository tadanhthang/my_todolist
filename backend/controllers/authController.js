const { poolPromise } = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await poolPromise;
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool
            .request()
            .input('email', email)
            .input('password', hashedPassword)
            .query('INSERT INTO Users (email, password) VALUES (@email, @password)');

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Đăng nhập
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await poolPromise;

        const result = await pool
            .request()
            .input('email', email)
            .query('SELECT * FROM Users WHERE email = @email');

        const user = result.recordset[0];
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerUser, loginUser };