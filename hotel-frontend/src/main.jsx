import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'aos/dist/aos.css'; // Стили AOS
import AOS from 'aos'; // Библиотека AOS

// Инициализируем AOS с настройками
AOS.init({
  duration: 800,          // Длительность анимации (мс)
  once: true,             // Анимация срабатывает один раз
  offset: 100,            // Смещение в пикселях
  delay: 0,               // Задержка по умолчанию
  easing: 'ease-in-out',  // Тип плавности
  mirror: false,          // Не повторять при прокрутке вверх
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);