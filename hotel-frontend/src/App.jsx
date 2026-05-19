import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Services from './pages/Services';
import Contacts from './pages/Contacts';
import Booking from './pages/Booking';
import GroupBooking from './pages/GroupBooking';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import logo from './assets/logo_RGPU.svg';
import logo2 from './assets/logo2_RGPU.svg';
import { MapPin, Phone, Mail, Clock, ArrowUp, User } from 'lucide-react';
import { useState } from 'react';
import CallbackModal from './components/CallbackModal';

function AppContent() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Шапка сайта (Меню) */}
      <nav className="bg-white shadow-md py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Логотип */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="Логотип РГПУ" className="w-14 h-14" />
            <div>
              <div className="font-bold text-[#2C3E66] text-2xl">Гостиница</div>
              <div className="text-gray-500 text-sm">им. А.И. Герцена</div>
            </div>
          </div>

          {/* Ссылки на страницы */}
          <div className="flex items-center gap-8 text-base font-medium text-gray-700">
            <Link to="/" className="hover:text-[#2C3E66] transition">Главная</Link>
            <Link to="/rooms" className="hover:text-[#2C3E66] transition">Номера</Link>
            <Link to="/services" className="hover:text-[#2C3E66] transition">Услуги</Link>
            <Link to="/contacts" className="hover:text-[#2C3E66] transition">Контакты</Link>
            <Link to="/group-booking" className="hover:text-[#2C3E66] transition">Групповое бронирование</Link>
            <Link to="/booking">
              <button className="border-2 border-[#2C3E66] text-[#2C3E66] px-6 py-2 rounded hover:bg-[#2C3E66] hover:text-white transition text-base">
                Бронировать
              </button>
            </Link>
            
            {/* Иконка профиля */}
            <Link to={user ? "/profile" : "/login"}>
              <div className="w-10 h-10 rounded-full bg-[#2C3E66] text-white flex items-center justify-center hover:bg-[#1a2a4a] transition cursor-pointer">
                <User className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Основное содержимое */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/group-booking" element={<GroupBooking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      {/* Подвал */}
      <footer className="bg-[#2C3E66] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo2} alt="Логотип РГПУ" className="w-20 h-20 filter brightness-0 invert" />
              </div>
              <p className="text-gray-300 text-sm">
                Университетская гостиница<br />
                им. А. И. Герцена
              </p>
              <p className="text-gray-400 text-xs mt-2">© 2026 Все права защищены</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Меню:</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition">О гостинице</Link></li>
                <li><Link to="/rooms" className="text-gray-300 hover:text-white transition">Номера</Link></li>
                <li><Link to="/services" className="text-gray-300 hover:text-white transition">Услуги</Link></li>
                <li><Link to="/contacts" className="text-gray-300 hover:text-white transition">Контакты</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Контакты:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-300 mt-0.5" />
                  <span className="text-gray-300 text-sm">Казанская улица, 6, Санкт-Петербург</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-5 h-5 text-gray-300 mt-0.5" />
                  <span className="text-gray-300 text-sm">+7 (812) 314-74-72</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-5 h-5 text-gray-300 mt-0.5" />
                  <span className="text-gray-300 text-sm">ogt_herzen@mail.ru</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-gray-300 mt-0.5" />
                  <span className="text-gray-300 text-sm">Круглосуточно</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">График работы:</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Круглосуточно</li>
                <li>Расчетный час – 12:00</li>
                <li>Заезд с 14:00, выезд до 12:00</li>
              </ul>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition text-sm"
              >
                Заказать звонок
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Кнопка "Наверх" */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-[#2C3E66] text-white p-3 rounded-full shadow-lg hover:bg-[#1a2a4a] transition z-50"
        aria-label="Наверх"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Модальное окно заказа звонка */}
      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
