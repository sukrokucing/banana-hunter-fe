import axios from '../utils/axios';
import API_ENDPOINTS from './apiEndpoints';

export const AuthService = {
    register: async (userData) => {
        try {
            const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, userData);
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
            const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
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
            await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
            localStorage.removeItem('access_token');
            return true;

        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }
};
