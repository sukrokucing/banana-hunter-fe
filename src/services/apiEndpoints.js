const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:88';

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/login`,
    REGISTER: `${BASE_URL}/api/register`,
    LOGOUT: `${BASE_URL}/api/logout`,
  },
  USER: {
    PROFILE: `${BASE_URL}/api/profile`,
  },
  // Add more endpoints as needed
};

export default API_ENDPOINTS;
