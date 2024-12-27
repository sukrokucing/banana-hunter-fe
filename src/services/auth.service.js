// src/services/auth.service.js
import axios from '../utils/axios';
import { useAuthStore } from '../context/authStore';
import API_ENDPOINTS from './apiEndpoints';

export const AuthService = {
  login: async (credentials) => {
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const { access_token, user } = response.data;
    useAuthStore.getState().setAuth({ user, token: access_token });
    console.log(response.data.message);
    return response.data;
  },
  register: async (userData) => {
    const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    const { access_token, user } = response.data;
    useAuthStore.getState().setAuth({ user, token: access_token });
    console.log(response.data.message);
    return response.data;
  },
  logout: async () => {
    await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
    useAuthStore.getState().clearAuth();
  },
};

export default AuthService;
