import axios from '../utils/axios';
import API_ENDPOINTS from './apiEndpoints';

export const UserService = {
  getProfile: async () => {
    const response = await axios.get(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  },
};

export default UserService;
