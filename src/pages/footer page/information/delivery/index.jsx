import React, { useEffect, useState } from 'react';
import HeaderMain from '../../../../components/header';
import Reveal from '../../../../animation';
import FooterMain from '../../../../components/footer';
import FooterInformationHeader from '../../../../components/footer/information header';
import AdsSlider from '../../../../components/ads slider';
import YandexLogo from '../../../../layouts/icons/yandex.svg';
import UzPostLogo from '../../../../layouts/icons/uzpost.svg';
import EasytLogo from '../../../../layouts/icons/logo_delivery.svg';
import './main.css';

function FooterDeliveryPage() {
  const [selectedRegion, setSelectedRegion] = useState('Tashkent');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div style={{backgroundColor: '#ffffff'}}>
      <HeaderMain />
      <AdsSlider />
      <div className="container">
        <div className="d-flex">
          <div>
            <FooterInformationHeader />
          </div>
          <div style={{width: '1000px', marginLeft: '80px'}}>
            <Reveal>
              <h1 className='footer_delivery_title'>
                {localStorage.getItem('selectedLanguage') === 'ru' ? 'Способы доставки EasyPrint' : 'Easy Print Yetkazib berish usuli'}
              </h1>
            </Reveal>
            <Reveal>
              <h4 className='footer_delivery_subtitle mt-4'>
                {localStorage.getItem('selectedLanguage') === 'ru' ? 'Доставка' : 'Yetkazib berish'}
              </h4>
            </Reveal>
            <Reveal>
              <p className='footer_delivery_text'>
                {localStorage.getItem('selectedLanguage') === 'ru'
                  ? `Доставка заказов осуществляется по всему миру. Вы можете указать адрес и выбрать способ доставки на этапе оформления заказа. Срок доставки складывается из времени необходимого на производство заказа (от одного дня) и выбранного способа доставки. Ниже вы можете проверить доступные методы доставки для вашего региона и сроки доставки.`
                  : `Buyurtmalarni yetkazib berish butun Oʻzbekiston boʻylab amalga oshiriladi. To‘lov vaqtida manzilingizni kiritishingiz va yetkazib berish usulini tanlashingiz mumkin. Yetkazib berish muddati buyurtmani ishlab chiqarish uchun zarur bo'lgan vaqtdan (ikki kundan boshlab) va tanlangan etkazib berish usulidan iborat. Quyida manzilingiz va yetkazib berish vaqtlari uchun mavjud etkazib berish usullarini tekshirishingiz mumkin.`}
              </p>
            </Reveal>
            <Reveal>
              <h4 className='footer_delivery_subtitle mt-5 mb-3'>
                {localStorage.getItem('selectedLanguage') === 'ru' ? 'Ваш адрес' : 'Sizning manzilingiz'}
              </h4>
            </Reveal>

            <div>
              <div className='d-flex' style={{marginTop: 32, marginBottom: 20}}>
                <button
                  style={{marginLeft: 0}}
                  className={`footer_delivery_select_button ${selectedRegion === 'Tashkent' ? 'selected' : ''}`}
                  onClick={() => handleRegionSelect('Tashkent')}
                >
                  {localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкент' : 'Toshkent'}
                </button>
                <button
                  className={`footer_delivery_select_button ${selectedRegion === 'TashkentRegion' ? 'selected' : ''}`}
                  onClick={() => handleRegionSelect('TashkentRegion')}
                >
                  {localStorage.getItem('selectedLanguage') === 'ru' ? 'Ташкентская область' : 'Toshkent viloyati'}
                </button>
              </div>
              <div>
                <h4 className='footer_delivery_subtitle_text'>
                  {localStorage.getItem('selectedLanguage') === 'ru' ? 'Регионы' : 'Viloyat'}
                </h4>
                <div className='d-flex' style={{marginTop: 12}}>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Samarqand' ? 'selected' : ''}`}
                    style={{marginLeft: 0}}
                    onClick={() => handleRegionSelect('Samarqand')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Самарканд' : 'Samarqand'}
                  </button>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Andijon' ? 'selected' : ''}`}
                    onClick={() => handleRegionSelect('Andijon')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Андижан' : 'Andijon'}
                  </button>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Fargona' ? 'selected' : ''}`}
                    onClick={() => handleRegionSelect('Fargona')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Фергана' : `Farg'ona`}
                  </button>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Namangan' ? 'selected' : ''}`}
                    onClick={() => handleRegionSelect('Namangan')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Наманган' : 'Namangan'}
                  </button>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Buxoro' ? 'selected' : ''}`}
                    onClick={() => handleRegionSelect('Buxoro')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Бухара' : 'Buxoro'}
                  </button>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Jizzax' ? 'selected' : ''}`}
                    onClick={() => handleRegionSelect('Jizzax')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Джизак' : 'Jizzax'}
                  </button>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Navoiy' ? 'selected' : ''}`}
                    onClick={() => handleRegionSelect('Navoiy')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Навоий' : 'Navoiy'}
                  </button>
                </div>
                <div className='d-flex' style={{marginTop: 16}}>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Qashqadaryo' ? 'selected' : ''}`}
                    style={{marginLeft: 0}}
                    onClick={() => handleRegionSelect('Qashqadaryo')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Кашкадарья' : 'Qashqadaryo'}
                  </button>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Surxandaryo' ? 'selected' : ''}`}
                    onClick={() => handleRegionSelect('Surxandaryo')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Сурхандарья' : 'Surxandaryo'}
                  </button>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Sirdaryo' ? 'selected' : ''}`}
                    onClick={() => handleRegionSelect('Sirdaryo')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Сырдарья' : 'Sirdaryo'}
                  </button>
                  <button
                    className={`footer_delivery_select_button ${selectedRegion === 'Xorazm' ? 'selected' : ''}`}
                    onClick={() => handleRegionSelect('Xorazm')}
                  >
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Хорезм' : 'Xorazm'}
                  </button>
                </div>
              </div>
            </div>

            {selectedRegion === 'Tashkent' ? (
              <div id='with_tashkent'>
                <Reveal>
                  <div className="delivery" style={{marginTop: '36px'}}>
                    <h5 className='footer_delivery_subtitle_text_delivery'>
                      {localStorage.getItem('selectedLanguage') === 'ru' ? 'Пункты выдачи Easy Print' : 'Easy Print tarqatish nuqtalari'}
                    </h5>
                    <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                      <div>
                        <img style={{width: '120px', marginRight: '33px'}} src={EasytLogo} alt="EasytLogo" />
                      </div>
                      <div className='mt-3' style={{marginRight: localStorage.getItem('selectedLanguage') === 'ru' ? '260px' : '210px'}}>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'Пункт самовывоза' : 'Qabul qilish punkti'}
                        </p>
                      </div>
                      <div className='mt-3' style={{marginRight: '121px'}}>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'от 1 дней' : '1 kundan boshlab'}
                        </p>
                      </div>
                      <div className='mt-3'>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'Бесплатно' : 'Bepul'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="delivery" style={{marginTop: '36px', marginBottom: '400px'}}>
                    <h5 className='footer_delivery_subtitle_text_delivery'>
                      {localStorage.getItem('selectedLanguage') === 'ru' ? 'Курьер' : 'Kuryer'}
                    </h5>
                    <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                      <div>
                        <img style={{width: '64px', marginRight: '60px', marginLeft: '32px'}} src={YandexLogo} alt="YandexLogo" />
                      </div>
                      <div className='mt-3' style={{marginRight: localStorage.getItem('selectedLanguage') === 'ru' ? '144px' : '15px'}}>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'Доставка курьером Яндекс GO' : 'Yandex GO kuryeri orqali yetkazib berish'}
                        </p>
                      </div>
                      <div className='mt-3' style={{marginRight: '121px'}}>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'от 1 дней' : '1 kundan boshlab'}
                        </p>
                      </div>
                      <div className='mt-3'>
                        <p className='delivery_text'>25 000</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ) : (
              <div id='without_tashkent'>
                <Reveal>
                  <div className="delivery" style={{marginTop: '36px'}}>
                    <h5 className='footer_delivery_subtitle_text_delivery'>
                      {localStorage.getItem('selectedLanguage') === 'ru' ? 'Пункты выдачи и постаматы' : 'Qabul qilish punktlari va posilka terminallari'}
                    </h5>
                    <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                      <div>
                        <img style={{width: '120px', marginRight: '33px'}} src={UzPostLogo} alt="UzPostLogo" />
                      </div>
                      <div className='mt-3' style={{marginRight: localStorage.getItem('selectedLanguage') === 'ru' ? '150px' : '121px'}}>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'Отделения почты Узбекистана' : 'O\'zbekiston pochta bo\'limlari'}
                        </p>
                      </div>
                      <div className='mt-3' style={{marginRight: '121px'}}>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'от 1 дней' : '1 kundan boshlab'}
                        </p>
                      </div>
                      <div className='mt-3'>
                        <p className='delivery_text'>25 000</p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="delivery" style={{marginTop: '36px'}}>
                    <h5 className='footer_delivery_subtitle_text_delivery'>
                      {localStorage.getItem('selectedLanguage') === 'ru' ? 'Курьер' : 'Kuryer'}
                    </h5>
                    <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                      <div>
                        <img style={{width: '120px', marginRight: '33px'}} src={UzPostLogo} alt="UzPostLogo" />
                      </div>
                      <div className='mt-3' style={{marginRight: localStorage.getItem('selectedLanguage') === 'ru' ? '300px' : '230px'}}>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'Почта UZPOST' : 'Pochta UZPOST'}
                        </p>
                      </div>
                      <div className='mt-3' style={{marginRight: '121px'}}>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'от 1 дней' : '1 kundan boshlab'}
                        </p>
                      </div>
                      <div className='mt-3'>
                        <p className='delivery_text'>25 000</p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="delivery" style={{marginTop: '36px', marginBottom: '400px'}}>
                    <h5 className='footer_delivery_subtitle_text_delivery'>
                      {localStorage.getItem('selectedLanguage') === 'ru' ? 'Пункты выдачи и постаматы' : 'Pochta'}
                    </h5>
                    <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                      <div>
                        <img style={{width: '120px', marginRight: '33px'}} src={UzPostLogo} alt="UzPostLogo" />
                      </div>
                      <div className='mt-3' style={{marginRight: localStorage.getItem('selectedLanguage') === 'ru' ? '300px' : '233px'}}>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'Почта UZPOST' : 'Pochta UZPOST'}
                        </p>
                      </div>
                      <div className='mt-3' style={{marginRight: '121px'}}>
                        <p className='delivery_text'>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'от 1 дней' : '1 kundan boshlab'}
                        </p>
                      </div>
                      <div className='mt-3'>
                        <p className='delivery_text'>25 000</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
}

export default FooterDeliveryPage;