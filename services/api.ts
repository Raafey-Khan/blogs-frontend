import axios from 'axios';
const API = axios.create({ baseURL: 'https://blogs-backend-jx2t.onrender.com/api' });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default API;
