import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, UserCircle } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+7',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      let newValue = value;
      if (!newValue.startsWith('+7')) {
        newValue = '+7' + newValue.replace(/\+7/g, '');
      }
      newValue = '+7' + newValue.replace(/[^\d]/g, '').slice(1);
      setFormData(prev => ({ ...prev, [name]: newValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(formData);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-16 px-6 max-w-md">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-[#2C3E66] mb-6 text-center">Регистрация</h1>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Имя</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-[#2C3E66]"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-[#2C3E66]"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Телефон</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-[#2C3E66]"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-[#2C3E66]"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Подтвердите пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-[#2C3E66]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2C3E66] text-white py-2 rounded hover:bg-[#1a2a4a] transition disabled:opacity-50"
          >
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-[#2C3E66] hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;