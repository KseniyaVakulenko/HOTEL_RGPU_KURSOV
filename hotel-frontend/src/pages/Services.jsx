import React, { useState, useEffect } from 'react';
import { Utensils, Dumbbell, Presentation, Car, Shirt, Monitor } from 'lucide-react';

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5229/api/Services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Ошибка загрузки услуг:', error));
  }, []);

  const getIcon = (title) => {
    const icons = {
      'Ресторан & Кафе': Utensils,
      'Фитнес-центр': Dumbbell,
      'Конференц-зал': Presentation,
      'Трансфер': Car,
      'Химчистка': Shirt,
      'Бизнес-центр': Monitor
    };
    return icons[title] || Utensils;
  };

  return (
    <div>
      <div className="bg-[#F0F2F5] py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E66] mb-2" data-aos="fade-down">Услуги и удобства</h1>
          <p className="text-gray-600 text-xl" data-aos="fade-up" data-aos-delay="200">Всё для комфортного пребывания</p>
        </div>
      </div>

      <div className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.title);
            return (
              <div 
                key={service.id} 
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition"
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-16 h-16 text-[#2C3E66]" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-[#2C3E66] text-center">{service.title}</h3>
                <p className="text-gray-600 text-lg text-center">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Services;