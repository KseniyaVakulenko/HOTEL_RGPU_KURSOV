import React, { useState } from 'react';
import { Calendar, Users, Building, Coffee, Mic, Monitor, Presentation } from 'lucide-react';
import { Link } from 'react-router-dom';

function GroupBooking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+7',
    company: '',
    eventType: 'conference',
    participants: '',
    eventDate: '',
    eventDuration: '',
    equipment: [],
    catering: false,
    comments: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  // Функция для валидации email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Функция для валидации телефона
  const validatePhone = (phone) => {
    const phoneRegex = /^\+7\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'equipment') {
        const newEquipment = formData.equipment.includes(value)
          ? formData.equipment.filter(item => item !== value)
          : [...formData.equipment, value];
        setFormData(prev => ({ ...prev, equipment: newEquipment }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (name === 'phone') {
      let newValue = value;
      if (!newValue.startsWith('+7')) {
        newValue = '+7' + newValue.replace(/\+7/g, '');
      }
      newValue = '+7' + newValue.replace(/[^\d]/g, '').slice(1);
      setFormData(prev => ({ ...prev, [name]: newValue }));
      
      if (newValue.length < 12) {
        setErrors(prev => ({ ...prev, phone: 'Введите полный номер (10 цифр после +7)' }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    } else if (name === 'email') {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Введите корректный email (например: name@domain.com)' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проверка перед отправкой
    if (!formData.name) {
      alert('Пожалуйста, введите ваше имя');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      alert('Пожалуйста, введите корректный email');
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      alert('Пожалуйста, введите корректный номер телефона (10 цифр после +7)');
      return;
    }
    
    if (!formData.eventDate) {
      alert('Пожалуйста, выберите дату мероприятия');
      return;
    }

    console.log('Данные группового бронирования:', formData);
    alert('Заявка на групповое бронирование отправлена! Мы свяжемся с вами для подтверждения.');
  };

  return (
    <div>
      {/* Заголовок страницы */}
      <div className="bg-[#F0F2F5] py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E66] mb-2" data-aos="fade-down">Групповое бронирование</h1>
          <p className="text-gray-600 text-xl" data-aos="fade-up" data-aos-delay="200">Организуйте мероприятие в нашей гостинице</p>
        </div>
      </div>

      {/* Форма */}
      <div className="container mx-auto py-16 px-6 max-w-4xl">
        <div className="bg-white p-10 md:p-12 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="300">
          {/* Информация о преимуществах */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#F0F2F5] p-4 rounded-lg text-center">
              <Users className="w-8 h-8 text-[#2C3E66] mx-auto mb-2" />
              <p className="text-sm font-medium">Вместимость до 100 человек</p>
            </div>
            <div className="bg-[#F0F2F5] p-4 rounded-lg text-center">
              <Presentation className="w-8 h-8 text-[#2C3E66] mx-auto mb-2" />
              <p className="text-sm font-medium">Конференц-залы с оборудованием</p>
            </div>
            <div className="bg-[#F0F2F5] p-4 rounded-lg text-center">
              <Coffee className="w-8 h-8 text-[#2C3E66] mx-auto mb-2" />
              <p className="text-sm font-medium">Кофе-брейки и питание</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Контактные данные */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Ваше имя *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#2C3E66]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded px-4 py-3 focus:outline-none focus:border-[#2C3E66] ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Телефон *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:border-[#2C3E66] ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Организация</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#2C3E66]"
              />
            </div>

            {/* Детали мероприятия */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Тип мероприятия</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#2C3E66]"
                >
                  <option value="conference">Конференция</option>
                  <option value="seminar">Семинар</option>
                  <option value="workshop">Воркшоп</option>
                  <option value="banquet">Банкет</option>
                  <option value="meeting">Деловая встреча</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Количество участников</label>
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  min="1"
                  className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#2C3E66]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Дата мероприятия</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#2C3E66]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Продолжительность</label>
                <select
                  name="eventDuration"
                  value={formData.eventDuration}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#2C3E66]"
                >
                  <option value="">Выберите...</option>
                  <option value="half-day">Полдня (4 часа)</option>
                  <option value="full-day">Весь день (8 часов)</option>
                  <option value="multi-day">Несколько дней</option>
                </select>
              </div>
            </div>

            {/* Оборудование */}
            <div>
              <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Дополнительное оборудование</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    name="equipment"
                    value="projector"
                    checked={formData.equipment.includes('projector')}
                    onChange={handleChange}
                  />
                  Проектор
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    name="equipment"
                    value="microphones"
                    checked={formData.equipment.includes('microphones')}
                    onChange={handleChange}
                  />
                  Микрофоны
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    name="equipment"
                    value="monitor"
                    checked={formData.equipment.includes('monitor')}
                    onChange={handleChange}
                  />
                  Мониторы
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    name="equipment"
                    value="whiteboard"
                    checked={formData.equipment.includes('whiteboard')}
                    onChange={handleChange}
                  />
                  Доска
                </label>
              </div>
            </div>

            {/* Питание */}
            <div>
              <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Дополнительные услуги</label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="catering"
                  checked={formData.catering}
                  onChange={handleChange}
                />
                Организация питания (кофе-брейк, обед)
              </label>
            </div>

            {/* Комментарии */}
            <div>
              <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Дополнительные пожелания</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#2C3E66]"
              ></textarea>
            </div>

            {/* Кнопка отправки */}
            <button
              type="submit"
              className="w-full bg-[#2C3E66] text-white py-3 rounded hover:bg-[#1a2a4a] transition text-lg"
            >
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GroupBooking;