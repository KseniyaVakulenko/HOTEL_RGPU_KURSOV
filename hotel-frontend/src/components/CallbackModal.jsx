import React, { useState } from 'react';
import { Phone, User, X } from 'lucide-react';

function CallbackModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+7'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({ name: '', phone: '+7' });
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="text-2xl font-bold text-[#2C3E66] mb-2">Заказать звонок</h2>
            <p className="text-gray-600 mb-6">Оставьте заявку, и мы перезвоним вам в ближайшее время</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Ваше имя</label>
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
                <label className="block font-medium text-gray-700 mb-1">Телефон</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-[#2C3E66]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2C3E66] text-white py-2 rounded hover:bg-[#1a2a4a] transition"
              >
                Заказать звонок
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#2C3E66] mb-2">Заявка отправлена!</h2>
            <p className="text-gray-600">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CallbackModal;