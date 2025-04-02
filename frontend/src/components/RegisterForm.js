import React, { useState } from 'react';
import { register } from '../services/authService';

function RegisterForm(onRegister) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Thêm state cho email
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            await register({ username, email, password }); // Gửi email trong payload
            alert('Registration successful!');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error); // Hiển thị lỗi từ backend
            } else {
                console.error('Error registering:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
    );
}

export default RegisterForm;