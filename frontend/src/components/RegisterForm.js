import React, { useState } from 'react';
import { register } from '../services/authService';

function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState(''); // Thêm state cho username
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (credentials) => {
        try {
            const response = await register(credentials);
            console.log('Registration successful:', response);
        } catch (error) {
            console.error('Error registering:', error.response?.data || error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        handleRegister({ username, password }); // Gửi đúng định dạng dữ liệu
    };

    return (
        <div className="popup">
            <form onSubmit={handleSubmit}>
                <h3>Register</h3>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Cập nhật giá trị username
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị email
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;