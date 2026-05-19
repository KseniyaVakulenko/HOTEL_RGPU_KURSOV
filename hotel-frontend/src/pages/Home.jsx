import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/spb_start_image.jpg';
import interiorImage from '../assets/hotel_start_image.jpg';
import { Landmark, GraduationCap, Utensils, Star } from 'lucide-react';

function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5229/api/Reviews')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Ошибка загрузки отзывов:', error));
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <div>
      {/* Блок "Приветствие" */}
      <div className="relative w-full h-[600px] md:h-[800px] bg-gray-800">
        <img src={heroImage} alt="Гостиница РГПУ" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-aos="fade-down">Добро пожаловать в гостиницу</h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-6" data-aos="fade-up" data-aos-delay="200">Российского государственного педагогического университета им. А.И. Герцена</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl" data-aos="fade-up" data-aos-delay="400">Уют, традиции и высокий сервис в самом сердце Санкт-Петербурга</p>
          <Link to="/rooms">
            <button className="bg-[#2C3E66] hover:bg-[#1a2a4a] text-white py-4 px-10 rounded text-xl" data-aos="fade-up" data-aos-delay="600">
              Забронировать номер
            </button>
          </Link>
        </div>
      </div>

      {/* Блок "О гостинице" */}
      <div className="container mx-auto py-20 px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2" data-aos="fade-right">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E66] mb-6">О гостинице</h2>
          <p className="text-gray-700 text-xl leading-loose">
            Наша гостиница расположена в историческом здании, сочетающем академическую атмосферу Герценовского университета и современный комфорт.
            Мы предлагаем гостям не только комфортабельные номера, но и возможность погрузиться в культурную жизнь города. Идеальное место для конференций, научных стажировок и культурного отдыха.
          </p>
        </div>
        <div className="md:w-1/2" data-aos="fade-left" data-aos-delay="200">
          <img src={interiorImage} alt="Интерьер" className="w-full rounded-xl shadow-lg"/>
        </div>
      </div>

      {/* Блок "Наши преимущества" */}
      <div className="bg-[#F0F2F5] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E66] mb-12" data-aos="fade-up">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-xl shadow-lg min-h-[280px] flex flex-col justify-center items-center" data-aos="fade-up" data-aos-delay="100">
              <Landmark className="w-16 h-16 text-[#2C3E66] mb-4 stroke-1" />
              <h3 className="font-bold text-2xl mb-3 text-[#2C3E66]">Исторический центр</h3>
              <p className="text-gray-600 text-lg">В шаговой доступности от Невского проспекта и главных достопримечательностей.</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-lg min-h-[280px] flex flex-col justify-center items-center" data-aos="fade-up" data-aos-delay="300">
              <GraduationCap className="w-16 h-16 text-[#2C3E66] mb-4 stroke-1" />
              <h3 className="font-bold text-2xl mb-3 text-[#2C3E66]">Академическая среда</h3>
              <p className="text-gray-600 text-lg">Идеально для исследователей, преподавателей и участников конференций.</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-lg min-h-[280px] flex flex-col justify-center items-center" data-aos="fade-up" data-aos-delay="500">
              <Utensils className="w-16 h-16 text-[#2C3E66] mb-4 stroke-1" />
              <h3 className="font-bold text-2xl mb-3 text-[#2C3E66]">Завтраки включены</h3>
              <p className="text-gray-600 text-lg">Каждое утро — шведский стол с местными деликатесами.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Блок отзывов */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E66] mb-12" data-aos="fade-up">Отзывы наших гостей</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div 
                key={review.id} 
                className="bg-[#F0F2F5] p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-left"
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 text-lg italic mb-4">"{review.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#2C3E66] text-lg">Гость {review.guestId}</span>
                  <span className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;