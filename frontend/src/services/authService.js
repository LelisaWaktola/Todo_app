// frontend/src/services/authService.js
import apiClient from './apiClient';

export const authService = {
  login: (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },

  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  getProfile: () => {
    return apiClient.get('/users/profile');
  }
};
