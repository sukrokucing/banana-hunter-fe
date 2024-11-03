import axios from '../utils/axios';

export const AuthService = {
    register: async (userData) => {
        try {
            const response = await axios.post('/api/register', userData);
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
            }
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    login: async (credentials) => {
        try {
            const response = await axios.post('/api/login', credentials);
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
            }
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    logout: async () => {
        try {
            await axios.post('/api/logout');
        } finally {
            localStorage.removeItem('access_token');
        }
    }
};
