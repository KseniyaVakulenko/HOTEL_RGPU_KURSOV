import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Замени на свой URL бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к каждому запросу, если он есть
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;