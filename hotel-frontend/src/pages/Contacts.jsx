import React from 'react';
import { MapPin, Phone, Mail, Clock, Train } from 'lucide-react';

function Contacts() {
  return (
    <div>
      {/* Заголовок страницы */}
      <div className="bg-[#F0F2F5] py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E66] mb-2" data-aos="fade-down">Контакты</h1>
          <p className="text-gray-600 text-xl" data-aos="fade-up" data-aos-delay="200">Как нас найти и связаться с нами</p>
        </div>
      </div>

      {/* Контент */}
      <div className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Информация */}
          <div className="space-y-8" data-aos="fade-right">
            <div>
              <h3 className="font-bold text-2xl text-[#2C3E66] flex items-center gap-3">
                <MapPin className="w-8 h-8 text-[#2C3E66]" />
                Адрес
              </h3>
              <p className="text-gray-600 text-lg ml-11">Казанская улица, 6, Санкт-Петербург</p>
            </div>
            <div>
              <h3 className="font-bold text-2xl text-[#2C3E66] flex items-center gap-3">
                <Phone className="w-8 h-8 text-[#2C3E66]" />
                Телефон
              </h3>
              <p className="text-gray-600 text-lg ml-11">+7 (812) 314-74-72</p>
            </div>
            <div>
              <h3 className="font-bold text-2xl text-[#2C3E66] flex items-center gap-3">
                <Mail className="w-8 h-8 text-[#2C3E66]" />
                E-mail
              </h3>
              <p className="text-gray-600 text-lg ml-11">ogt_herzen@mail.ru</p>
            </div>
            <div>
              <h3 className="font-bold text-2xl text-[#2C3E66] flex items-center gap-3">
                <Clock className="w-8 h-8 text-[#2C3E66]" />
                График работы
              </h3>
              <div className="ml-11 text-lg text-gray-600 space-y-1">
                <p>Круглосуточно</p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-semibold text-[#2C3E66]">Заезд:</span> с 14:00
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-[#2C3E66]">Выезд:</span> до 12:00
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-[#2C3E66]">Расчетный час:</span> 12:00
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-2xl text-[#2C3E66] flex items-center gap-3">
                <Train className="w-8 h-8 text-[#2C3E66]" />
                Ближайшие станции метро
              </h3>
              <ul className="ml-11 text-lg text-gray-600 space-y-2">
                <li>
                  <span className="font-semibold">Невский проспект</span> — 5 минут пешком
                </li>
                <li>
                  <span className="font-semibold">Гостиный двор</span> — 8 минут пешком
                </li>
                <li>
                  <span className="font-semibold">Адмиралтейская</span> — 10 минут пешком
                </li>
              </ul>
            </div>
          </div>

          {/* Карта */}
          <div className="rounded-xl overflow-hidden h-[500px] shadow-lg" data-aos="fade-left" data-aos-delay="200">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=30.322588%2C59.933041&z=16.62&pt=30.322588%2C59.933041%2Cpm2rdl"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Карта"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;