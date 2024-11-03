import axios from 'axios';

// Track pending requests
const pendingRequests = new Map();

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Generate request key
const getRequestKey = (config) => {
    return `${config.method}:${config.url}`;
};

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Cancel previous pending request
    const requestKey = getRequestKey(config);
    const previousRequest = pendingRequests.get(requestKey);
    if (previousRequest) {
        previousRequest.abort();
    }

    // Create new abort controller
    const controller = new AbortController();
    config.signal = controller.signal;
    pendingRequests.set(requestKey, controller);

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        // Clean up pending request
        const requestKey = getRequestKey(response.config);
        pendingRequests.delete(requestKey);
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
        // Clean up pending request
        if (error.config) {
            const requestKey = getRequestKey(error.config);
            pendingRequests.delete(requestKey);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
