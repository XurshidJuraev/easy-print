import React from 'react'
import './main.css'

import logo from '../../layouts/icons/logo_light.svg'
import instagram from '../../layouts/icons/instagram.svg'
import telegram from '../../layouts/icons/telegram.svg'

function FooterMain() {
  return (
    <footer className='footer'>
      <ul style={{listStyle: 'none', display: 'flex', justifyContent: 'space-between', margin: '0 120px 0 120px', paddingTop: '60px'}}>
        {/* <li style={{marginTop: '80px'}}>
          <img src={logo} alt="logo" />
        </li> */}

        <li>
          <h3 className='footer_title'>Информация</h3>
          <br />

          <ul style={{listStyle: 'none'}}>
            <li className='footer_text'>support@easygo.uz</li>
            <li className='footer_text'>support@easygo.uz</li>
            <li className='footer_text'>Instagram</li>
            <li className='footer_text'>Telegram</li>
            <li className='footer_text'>YouTube</li>
            <li className='footer_text'>г. Ташкент, Инжобод 32</li>
          </ul>
        </li>

        <li>
          <h3 className='footer_title'>Сотрудничество</h3>
          <br />

          <ul style={{listStyle: 'none'}}>
            <li className='footer_text'>support@easygo.uz</li>
            <li className='footer_text'>support@easygo.uz</li>
            <li className='footer_text'>Instagram</li>
            <li className='footer_text'>Telegram</li>
            <li className='footer_text'>YouTube</li>
            <li className='footer_text'>г. Ташкент, Инжобод 32</li>
          </ul>
        </li>

        <li>
          <h3 className='footer_title'>О компании</h3>
          <br />

          <ul style={{listStyle: 'none'}}>
            <li className='footer_text'>support@easygo.uz</li>
            <li className='footer_text'>support@easygo.uz</li>
            <li className='footer_text'>Instagram</li>
            <li className='footer_text'>Telegram</li>
            <li className='footer_text'>YouTube</li>
            <li className='footer_text'>г. Ташкент, Инжобод 32</li>
          </ul>
        </li>

        <li>
          <h3 className='footer_title'>Связаться с нами</h3>
          <br />

          <ul style={{listStyle: 'none'}}>
            <li className='footer_text'>support@easygo.uz</li>
            <li className='footer_text'>support@easygo.uz</li>
            <li className='footer_text'>Instagram</li>
            <li className='footer_text'>Telegram</li>
            <li className='footer_text'>YouTube</li>
            <li className='footer_text'>г. Ташкент, Инжобод 32</li>
          </ul>
        </li>

        {/* <li>
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
        </li> */}
      </ul>

      <center>
        <hr style={{marginTop: '76px', width: '1074px'}} />
      </center>

      <ul style={{listStyle: 'none', height: '141px', display: 'flex', justifyContent: 'space-between', margin: '0 120px 0 120px', paddingTop: '60px'}}>
        <li>
          <h2 className='footer_logo'>EASY PRINT</h2>
        </li>

        <li className='footer_text'>
          © {(new Date().getFullYear())} Easy Print, Все права защищены.
        </li>

        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
            <rect x="0.5" y="0.5" width="38" height="38" rx="19" stroke="#B3B3B3"/>
            <path d="M25.9021 26.1701C26.5112 23.0224 27.7111 16.2011 27.9873 13.3911C28.0579 12.6801 27.8492 11.9883 26.9807 12.0002C26.2872 12.012 25.2254 12.369 20.1112 14.4221C18.3206 15.142 14.7408 16.6306 9.37352 18.8881C8.50198 19.2229 8.04627 19.5503 8.00484 19.8702C7.92505 20.4835 8.84262 20.676 9.99495 21.0375C10.9355 21.3337 12.1999 21.6789 12.8566 21.6922C13.4535 21.7041 14.1194 21.467 14.8544 20.9797C19.8703 17.712 22.4589 16.0604 22.6215 16.0248C22.7351 15.9996 22.8931 15.9685 23.002 16.0604C23.111 16.1522 23.0987 16.327 23.088 16.3744C22.9959 16.7492 18.2853 20.8864 18.0137 21.1589C16.978 22.1973 15.7996 22.8328 17.6178 23.9897C19.1906 24.991 20.1066 25.6295 21.727 26.6545C22.7627 27.3092 23.5744 28.0869 24.6439 27.9921C25.1349 27.9491 25.6443 27.5033 25.9021 26.1701Z" fill="#5C16EB"/>
          </svg>

          <svg style={{marginLeft: '16px'}} xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
            <rect x="0.5" y="0.5" width="38" height="38" rx="19" stroke="#B3B3B3"/>
            <path d="M25.9021 26.1701C26.5112 23.0224 27.7111 16.2011 27.9873 13.3911C28.0579 12.6801 27.8492 11.9883 26.9807 12.0002C26.2872 12.012 25.2254 12.369 20.1112 14.4221C18.3206 15.142 14.7408 16.6306 9.37352 18.8881C8.50198 19.2229 8.04627 19.5503 8.00484 19.8702C7.92505 20.4835 8.84262 20.676 9.99495 21.0375C10.9355 21.3337 12.1999 21.6789 12.8566 21.6922C13.4535 21.7041 14.1194 21.467 14.8544 20.9797C19.8703 17.712 22.4589 16.0604 22.6215 16.0248C22.7351 15.9996 22.8931 15.9685 23.002 16.0604C23.111 16.1522 23.0987 16.327 23.088 16.3744C22.9959 16.7492 18.2853 20.8864 18.0137 21.1589C16.978 22.1973 15.7996 22.8328 17.6178 23.9897C19.1906 24.991 20.1066 25.6295 21.727 26.6545C22.7627 27.3092 23.5744 28.0869 24.6439 27.9921C25.1349 27.9491 25.6443 27.5033 25.9021 26.1701Z" fill="#5C16EB"/>
          </svg>
          
          <svg style={{marginLeft: '16px'}} xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
            <rect x="0.5" y="0.5" width="38" height="38" rx="19" stroke="#B3B3B3"/>
            <path d="M25.9021 26.1701C26.5112 23.0224 27.7111 16.2011 27.9873 13.3911C28.0579 12.6801 27.8492 11.9883 26.9807 12.0002C26.2872 12.012 25.2254 12.369 20.1112 14.4221C18.3206 15.142 14.7408 16.6306 9.37352 18.8881C8.50198 19.2229 8.04627 19.5503 8.00484 19.8702C7.92505 20.4835 8.84262 20.676 9.99495 21.0375C10.9355 21.3337 12.1999 21.6789 12.8566 21.6922C13.4535 21.7041 14.1194 21.467 14.8544 20.9797C19.8703 17.712 22.4589 16.0604 22.6215 16.0248C22.7351 15.9996 22.8931 15.9685 23.002 16.0604C23.111 16.1522 23.0987 16.327 23.088 16.3744C22.9959 16.7492 18.2853 20.8864 18.0137 21.1589C16.978 22.1973 15.7996 22.8328 17.6178 23.9897C19.1906 24.991 20.1066 25.6295 21.727 26.6545C22.7627 27.3092 23.5744 28.0869 24.6439 27.9921C25.1349 27.9491 25.6443 27.5033 25.9021 26.1701Z" fill="#5C16EB"/>
          </svg>
        </li>
      </ul>
    </footer>
  )
}

export default FooterMain