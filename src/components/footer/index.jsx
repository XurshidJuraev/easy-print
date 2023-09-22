import React from 'react'
import './main.css'

import logo from '../../layouts/icons/logo_light.svg'
import instagram from '../../layouts/icons/instagram.svg'
import telegram from '../../layouts/icons/telegram.svg'

function FooterMain() {
  return (
    <footer className='footer'>
      <ul style={{listStyle: 'none', display: 'flex', justifyContent: 'space-between', margin: '0 120px 0 120px', paddingTop: '60px'}}>
        <li style={{marginTop: '80px'}}>
          <img src={logo} alt="logo" />
        </li>

        <li>
          <h3 className='footer_title'>Информация</h3>
          <br />

          <ul style={{listStyle: 'none'}}>
            <li className='footer_text'>Доставка</li>
            <li className='footer_text'>Обмен и возврат</li>
            <li className='footer_text'>Способ оплаты</li>
            <li className='footer_text'>О нас</li>
            <li className='footer_text'>Наш адрес на карте</li>
          </ul>
        </li>

        <li>
          <h3 className='footer_title'>Сотрудничество</h3>
          <br />

          <ul style={{listStyle: 'none'}}>
            <li className='footer_text'>Производители</li>
            <li className='footer_text'>Дизайнерам</li>
            <li className='footer_text'>Текстилям</li>
            <li className='footer_text'>Реклама</li>
          </ul>
        </li>

        <li>
          <h3 style={{position: 'relative', left: '30px'}} className='footer_title'>Контакты</h3>
          <br />

          <ul style={{listStyle: 'none'}}>
            <div style={{position: 'relative', left: '30px'}}>
              <li className='footer_text'>easyprint@gmail.com</li>
              <li className='footer_text'>+998 99 335 75 78</li>
              <li style={{marginLeft: '-30px'}} className='d-flex'>
                <img src={instagram} alt="instagram" />
                <img className='ms-5' src={telegram} alt="telegram" />
              </li>
            </div>
            <li className='footer_laws'>© {(new Date().getFullYear())} Easy Print, Все права защищены.</li>
          </ul>
        </li>
      </ul>
    </footer>
  )
}

export default FooterMain