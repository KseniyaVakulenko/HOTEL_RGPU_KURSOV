import axios from 'axios';

// ВАЖНО: Твоя ссылка может отличаться! Посмотри в терминале, где запустился backend (например, https://localhost:7004)
const api = axios.create({
    baseURL: 'https://localhost:5229/api',
});

export default api;