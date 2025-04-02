import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Thay bằng URL backend của bạn

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Trả về token hoặc thông tin người dùng
};

export const register = async (credentials) => {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
};