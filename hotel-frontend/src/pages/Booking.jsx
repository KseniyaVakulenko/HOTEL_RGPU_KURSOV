import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CreditCard, Clock, Calendar } from 'lucide-react';

function Booking() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRoom = queryParams.get('room') || 'Одноместный';
  const initialPrice = parseInt(queryParams.get('price')) || 2500;

  const roomPrices = {
    'Одноместный': 2500,
    'Двухместный': 4500,
    'Двухместный + доп.место': 6500
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+7',
    checkIn: '',
    checkOut: '',
    roomType: initialRoom,
    comments: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [nights, setNights] = useState(0);

  const getTodayString = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return (new Date(now - offset)).toISOString().slice(0, 10);
  };

  const today = getTodayString();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+7\d{10}$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      let newValue = value;
      if (!newValue.startsWith('+7')) newValue = '+7' + newValue.replace(/\+7/g, '');
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

  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
      const pricePerNight = roomPrices[formData.roomType] || 0;
      setTotalPrice(pricePerNight * diffDays);
    } else {
      setNights(0);
      setTotalPrice(0);
    }
  }, [formData.checkIn, formData.checkOut, formData.roomType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) { alert('Пожалуйста, введите ваше имя'); return; }
    if (!validateEmail(formData.email)) { alert('Пожалуйста, введите корректный email'); return; }
    if (!validatePhone(formData.phone)) { alert('Пожалуйста, введите корректный номер телефона'); return; }
    if (!formData.checkIn || !formData.checkOut) { alert('Пожалуйста, выберите даты заезда и выезда'); return; }
    if (nights < 1) { alert('Дата выезда должна быть позже даты заезда'); return; }
    alert('Заявка отправлена! Мы свяжемся с вами для подтверждения.');
  };

  return (
    <div>
      <div className="bg-[#F0F2F5] py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E66] mb-2" data-aos="fade-down">Бронирование номера</h1>
          <p className="text-gray-600 text-xl" data-aos="fade-up" data-aos-delay="200">Заполните форму, и мы свяжемся с вами для подтверждения</p>
        </div>
      </div>

      <div className="container mx-auto py-16 px-6 max-w-4xl">
        <div className="bg-white p-10 md:p-12 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="300">
          <form onSubmit={handleSubmit}>
            <div className="mb-6" data-aos="fade-up" data-aos-delay="400">
              <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Ваше имя *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-5 py-4 focus:outline-none focus:border-[#2C3E66] text-lg"
              />
            </div>

            <div className="mb-6" data-aos="fade-up" data-aos-delay="500">
              <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full border rounded px-5 py-4 focus:outline-none focus:border-[#2C3E66] text-lg ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6" data-aos="fade-up" data-aos-delay="600">
              <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Телефон *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full border rounded px-5 py-4 focus:outline-none focus:border-[#2C3E66] text-lg ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+7 (999) 999-99-99"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">Введите 10 цифр после +7</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" data-aos="fade-up" data-aos-delay="700">
              <div>
                <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Дата заезда</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={today}
                  className="w-full border border-gray-300 rounded px-5 py-4 text-lg focus:outline-none focus:border-[#2C3E66]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Дата выезда</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || today}
                  className="w-full border border-gray-300 rounded px-5 py-4 text-lg focus:outline-none focus:border-[#2C3E66]"
                />
              </div>
            </div>

            <div className="mb-6" data-aos="fade-up" data-aos-delay="800">
              <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Тип номера</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-5 py-4 focus:outline-none focus:border-[#2C3E66] text-lg"
              >
                <option value="Одноместный">Обновлённый номер одноместный в блоке (II категории) — 2 500 ₽/сутки</option>
                <option value="Двухместный">Обновлённый номер двухместный стандарт (I категории) — 4 500 ₽/сутки</option>
                <option value="Двухместный + доп.место">Обновлённый номер двухместный стандарт (I категории) + доп.место — 6 500 ₽/сутки</option>
              </select>
            </div>

            {nights > 0 && (
              <div className="bg-[#F0F2F5] p-6 rounded-lg mb-6" data-aos="fade-up" data-aos-delay="900">
                <h3 className="font-bold text-xl text-[#2C3E66] mb-2">Детали бронирования</h3>
                <div className="space-y-2 text-lg">
                  <p><span className="font-semibold">Тип номера:</span> {formData.roomType}</p>
                  <p><span className="font-semibold">Цена за сутки:</span> {roomPrices[formData.roomType].toLocaleString()} ₽</p>
                  <p><span className="font-semibold">Количество суток:</span> {nights}</p>
                  <p className="text-2xl font-bold text-[#2C3E66] mt-2">
                    <span className="font-semibold">Итоговая цена:</span> {totalPrice.toLocaleString()} ₽
                  </p>
                </div>
              </div>
            )}

            <div className="mb-8" data-aos="fade-up" data-aos-delay="1000">
              <label className="block font-bold text-[#2C3E66] mb-2 text-lg">Дополнительные пожелания</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded px-5 py-4 focus:outline-none focus:border-[#2C3E66] text-lg"
              ></textarea>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8" data-aos="fade-up" data-aos-delay="1100">
              <h3 className="font-bold text-xl text-[#2C3E66] mb-2">Важная информация</h3>
              <ul className="space-y-2 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <CreditCard className="w-6 h-6 text-[#2C3E66] mt-1" />
                  <span><span className="font-semibold">При себе необходимо иметь паспорт</span> для оформления проживания.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#2C3E66] mt-1" />
                  <span><span className="font-semibold">Заезд:</span> с 14:00</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#2C3E66] mt-1" />
                  <span><span className="font-semibold">Выезд:</span> до 12:00</span>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2C3E66] text-white py-4 rounded hover:bg-[#1a2a4a] transition text-xl"
              data-aos="fade-up" data-aos-delay="1200"
            >
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;