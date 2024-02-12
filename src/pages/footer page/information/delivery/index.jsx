import React, { useEffect } from 'react'
import HeaderMain from '../../../../components/header'
import AdvantageMain from '../../../../components/advantage'
import FooterMain from '../../../../components/footer'
import FooterInformationHeader from '../../../../components/footer/information header'
import AdsSlider from '../../../../components/ads slider'
import YandexLogo from '../../../../layouts/icons/yandex.svg'
import UzPostLogo from '../../../../layouts/icons/uzpost.svg'
import './main.css';

function FooterDeliveryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

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
            <h1 className='footer_delivery_title'>Способы доставки EasyPrint</h1>

            <h4 className='footer_delivery_subtitle mt-4'>Доставка</h4>
            <p className='footer_delivery_text'>Доставка заказов осуществляется по всему миру. Вы можете указать адрес и выбрать способ доставки на этапе оформления заказа. Срок доставки складывается из времени необходимого на производство заказа (от двух дней) и выбранного способа доставки. Ниже вы можете проверить доступные методы доставки для вашего региона и сроки доставки.</p>

            <h4 className='footer_delivery_subtitle mt-5 mb-3'>Ваш адрес</h4>

            <div className="d-flex">
              <div>
                <h4 className='footer_delivery_subtitle_text'>Область</h4>

                <select className='footer_delivery_select'>
                  <option>Ташкентская область</option>
                  <option>Ташкентская область</option>
                  <option>Ташкентская область</option>
                  <option>Ташкентская область</option>
                </select>
              </div>

              <div style={{marginLeft: '80px'}}>
                <h4 className='footer_delivery_subtitle_text'>Город</h4>

                <select className='footer_delivery_select'>
                  <option>Ташкент</option>
                  <option>Ташкент</option>
                  <option>Ташкент</option>
                  <option>Ташкент</option>
                </select>
              </div>
            </div>

            <div className="delivery" style={{marginTop: '36px'}}>
              <h5 className='footer_delivery_subtitle_text_delivery'>Пункты выдачи и постаматы</h5>

              <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                <div>
                  <img style={{width: '120px', marginRight: '33px'}} src={UzPostLogo} alt="UzPostLogo" />
                </div>

                <div className='mt-3' style={{marginRight: '150px'}}>
                  <p className='delivery_text'>Отделения почты Узбекистана</p>
                </div>

                <div className='mt-3' style={{marginRight: '121px'}}>
                  <p className='delivery_text'>от 2 дней</p>
                </div>

                <div className='mt-3'>
                  <p className='delivery_text'>25 000</p>
                </div>
              </div>
            </div>

            <div className="delivery" style={{marginTop: '36px'}}>
              <h5 className='footer_delivery_subtitle_text_delivery'>Курьер</h5>

              <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                <div>
                  <img style={{width: '120px', marginRight: '33px'}} src={UzPostLogo} alt="UzPostLogo" />
                </div>

                <div className='mt-3' style={{marginRight: '150px'}}>
                  <p className='delivery_text'>Отделения почты Узбекистана</p>
                </div>

                <div className='mt-3' style={{marginRight: '121px'}}>
                  <p className='delivery_text'>от 2 дней</p>
                </div>

                <div className='mt-3'>
                  <p className='delivery_text'>25 000</p>
                </div>
              </div>

              <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                <div>
                  <img style={{width: '64px', marginRight: '60px', marginLeft: '32px'}} src={YandexLogo} alt="UzPostLogo" />
                </div>

                <div className='mt-3' style={{marginRight: '144px'}}>
                  <p className='delivery_text'>Доставка курьером Яндекс GO</p>
                </div>

                <div className='mt-3' style={{marginRight: '121px'}}>
                  <p className='delivery_text'>от 2 дней</p>
                </div>

                <div className='mt-3'>
                  <p className='delivery_text'>25 000</p>
                </div>
              </div>
            </div>

            <div className="delivery" style={{marginTop: '36px', marginBottom: '400px'}}>
              <h5 className='footer_delivery_subtitle_text_delivery'>Пункты выдачи и постаматы</h5>

              <div className="d-flex align-items-center" style={{height: '60px', marginTop: '25px'}}>
                <div>
                  <img style={{width: '120px', marginRight: '33px'}} src={UzPostLogo} alt="UzPostLogo" />
                </div>

                <div className='mt-3' style={{marginRight: '150px'}}>
                  <p className='delivery_text'>Почта</p>
                </div>

                <div className='mt-3' style={{marginRight: '121px'}}>
                  <p className='delivery_text'>от 2 дней</p>
                </div>

                <div className='mt-3'>
                  <p className='delivery_text'>25 000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  )
}

export default FooterDeliveryPage