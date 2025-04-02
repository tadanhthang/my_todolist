import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // URL backend

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

export const register = async (credentials) => {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
};