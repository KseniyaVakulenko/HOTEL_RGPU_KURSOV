import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, CreditCard, Calendar, Clock, List, ChevronRight, LogOut, Edit } from 'lucide-react';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+7',
    passportData: ''
  });

  const API_URL = 'http://localhost:5229/api';

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfileData();
  }, [user, navigate]);

  const fetchProfileData = async () => {
    try {
      // Получаем данные гостя
      const userResponse = await fetch(`${API_URL}/Profile/user/${user.id}`);
      const userData = await userResponse.json();
      setProfile(userData);
      setFormData({
        name: userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone || '+7',
        passportData: userData.passportData || ''
      });

      // Получаем бронирования
      const bookingsResponse = await fetch(`${API_URL}/Profile/bookings/${user.id}`);
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData);
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBookingServices = async (bookingId) => {
    try {
      const response = await fetch(`${API_URL}/Profile/orders/${bookingId}`);
      const data = await response.json();
      setServices(data);
      setSelectedBooking(bookingId);
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      let newValue = value;
      if (!newValue.startsWith('+7')) newValue = '+7' + newValue.replace(/\+7/g, '');
      newValue = '+7' + newValue.replace(/[^\d]/g, '').slice(1);
      setFormData(prev => ({ ...prev, [name]: newValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/Profile/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: user.id,  // ID гостя
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          passportData: formData.passportData
        })
      });
      if (response.ok) {
        const updatedData = await response.json();
        setProfile(updatedData);
        setEditMode(false);
        alert('Профиль успешно обновлён!');
      } else {
        alert('Ошибка при обновлении профиля');
      }
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      alert('Ошибка при обновлении профиля');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Активно': return 'bg-green-100 text-green-800';
      case 'Подтверждено': return 'bg-blue-100 text-blue-800';
      case 'Завершено': return 'bg-gray-100 text-gray-800';
      case 'Отменено': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  if (loading) return <div className="text-center py-10">Загрузка...</div>;

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка - профиль */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-[#2C3E66]">Мой профиль</h1>
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-[#2C3E66] text-white p-2 rounded hover:bg-[#1a2a4a] transition"
              >
                {editMode ? '✕' : <Edit className="w-5 h-5" />}
              </button>
            </div>

            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Паспортные данные</label>
                  <input
                    type="text"
                    name="passportData"
                    value={formData.passportData}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#2C3E66] text-white py-2 rounded hover:bg-[#1a2a4a] transition"
                >
                  Сохранить
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#2C3E66]" />
                  <div>
                    <span className="text-sm text-gray-500">ФИО</span>
                    <p className="font-medium">{profile?.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#2C3E66]" />
                  <div>
                    <span className="text-sm text-gray-500">Email</span>
                    <p className="font-medium">{profile?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#2C3E66]" />
                  <div>
                    <span className="text-sm text-gray-500">Телефон</span>
                    <p className="font-medium">{profile?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#2C3E66]" />
                  <div>
                    <span className="text-sm text-gray-500">Паспорт</span>
                    <p className="font-medium">{profile?.passportData}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mt-4"
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Правая колонка - бронирования */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#2C3E66] mb-6">Мои бронирования</h2>
            
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">У вас пока нет бронирований</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#2C3E66]" />
                          <span className="font-semibold">{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Номер: {booking.room.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Гостей: {booking.guestCount}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        <span className="font-bold text-[#2C3E66]">{booking.totalPrice} ₽</span>
                        <button
                          onClick={() => loadBookingServices(booking.id)}
                          className="text-sm text-[#2C3E66] hover:underline"
                        >
                          Посмотреть услуги
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;