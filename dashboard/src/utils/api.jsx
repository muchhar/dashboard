// utils/api.js (create this file)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mt4api.frequencee.io',
});

// Add a request interceptor to include the token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('mt4_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;