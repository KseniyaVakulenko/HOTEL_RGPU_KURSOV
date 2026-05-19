import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Users, Wifi, Tv, Thermometer } from 'lucide-react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);
setDefaultLocale('ru');

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(2);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [bookedDatesMap, setBookedDatesMap] = useState({});

  // Загрузка номеров
  useEffect(() => {
    fetch('http://localhost:5229/api/Rooms')
      .then(response => response.json())
      .then(data => {
        setRooms(data);
        setFilteredRooms(data);
      })
      .catch(error => console.error('Ошибка загрузки номеров:', error));
  }, []);

  // Загрузка занятых дат для всех номеров
  useEffect(() => {
    const fetchBookedDates = async () => {
      const datesMap = {};
      for (const room of rooms) {
        try {
          const response = await fetch(`http://localhost:5229/api/Rooms/booked-dates/${room.id}`);
          if (response.ok) {
            const data = await response.json();
            datesMap[room.id] = data;
          }
        } catch (error) {
          console.error(`Ошибка загрузки дат для номера ${room.id}:`, error);
        }
      }
      setBookedDatesMap(datesMap);
    };

    if (rooms.length > 0) {
      fetchBookedDates();
    }
  }, [rooms]);

  // Проверка занятости даты для конкретного номера
  const isDateBooked = (date, roomId) => {
    const roomBookedDates = bookedDatesMap[roomId] || [];
    const dateStr = date.toISOString().split('T')[0];
    return roomBookedDates.includes(dateStr);
  };

  // Стилизация дней в календаре
  const dayClassName = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return 'text-gray-300 bg-gray-100';
    
    // Используем первый номер в списке для отображения занятости
    const firstRoomId = filteredRooms.length > 0 ? filteredRooms[0].id : 1;
    const isBooked = isDateBooked(date, firstRoomId);
    
    if (isBooked) return 'text-red-500 bg-red-100';
    return 'text-green-700 bg-green-50';
  };

  // Фильтрация номеров
  const handleSearch = () => {
    if (!startDate || !endDate) {
      setFilteredRooms(rooms);
      return;
    }

    let isAvailable = true;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Проверяем занятость для всех номеров
      for (const room of rooms) {
        if (isDateBooked(currentDate, room.id)) {
          isAvailable = false;
          break;
        }
      }
      if (!isAvailable) break;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    let availableRooms = rooms.filter(room => room.maxGuests >= guests);
    
    if (!isAvailable) {
      setFilteredRooms([]);
      return;
    }

    setFilteredRooms(availableRooms);
  };

  return (
    <div>
      {/* Заголовок */}
      <div className="bg-[#F0F2F5] py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E66] mb-2" data-aos="fade-down">Наши номера</h1>
          <p className="text-gray-600 text-xl" data-aos="fade-up" data-aos-delay="200">Выберите даты и количество гостей</p>
        </div>
      </div>

      {/* Фильтр */}
      <div className="container mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Даты</label>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                isClearable={true}
                placeholderText="Выберите даты"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#2C3E66]"
                dateFormat="dd.MM.yyyy"
                monthsShown={2}
                minDate={new Date()}
                dayClassName={dayClassName}
                wrapperClassName="w-full"
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Гости</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#2C3E66]"
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-auto">
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-[#2C3E66] text-white px-6 py-2 rounded hover:bg-[#1a2a4a] transition whitespace-nowrap"
              >
                Проверить наличие
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Список номеров */}
      <div className="container mx-auto py-8 px-6">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl">
            <p className="text-xl text-gray-600">По вашему запросу номера не найдены</p>
            <p className="text-gray-500 mt-2">Попробуйте изменить даты или количество гостей</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredRooms.map((room, index) => (
              <div 
                key={room.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="h-64 overflow-hidden rounded-t-xl">
                  <img src={room.imageUrl} alt={room.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold mb-3 text-[#2C3E66]">{room.title}</h2>
                  
                  {/* Основная информация */}
                  <div className="space-y-2 text-gray-600 text-lg mb-4">
                    <p><span className="font-semibold text-[#2C3E66]">Вместимость:</span> {room.maxGuests} {room.maxGuests === 1 ? 'гость' : 'гостя'}</p>
                    <p><span className="font-semibold text-[#2C3E66]">Площадь:</span> {room.area} м²</p>
                    <p><span className="font-semibold text-[#2C3E66]">Кроватей:</span> {room.bedCount}</p>
                    <p><span className="font-semibold text-[#2C3E66]">Вид из окна:</span> {room.view}</p>
                  </div>

                  {/* Удобства с иконками */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.hasWiFi && <div className="flex items-center gap-1 text-sm text-gray-600"><Wifi className="w-4 h-4 text-[#2C3E66]" /> WiFi</div>}
                    {room.hasTV && <div className="flex items-center gap-1 text-sm text-gray-600"><Tv className="w-4 h-4 text-[#2C3E66]" /> ТВ</div>}
                    {room.hasAC && <div className="flex items-center gap-1 text-sm text-gray-600"><Thermometer className="w-4 h-4 text-[#2C3E66]" /> Кондиционер</div>}
                  </div>

                  {/* Дополнительные удобства текстом */}
                  {room.amenities && (
                    <p className="text-sm text-gray-500 mb-4">{room.amenities}</p>
                  )}

                  {/* Цена и кнопка */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#2C3E66]">{room.price} ₽/сутки</span>
                    <Link to={`/booking?room=${encodeURIComponent(room.title)}&price=${room.price}`}>
                      <button className="bg-[#2C3E66] text-white px-6 py-3 rounded hover:bg-[#1a2a4a] transition text-base font-semibold shadow-md hover:shadow-lg">
                        Забронировать
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;