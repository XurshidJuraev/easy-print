import React from 'react'
import './main.css'
import authImage from '../../layouts/images/43.svg'

function AuthPageMobile() {
  return (
    <>
      <center id='first'>
        <h2 className='auth_title'>Регистрация</h2>
        <p className='auth_text'>Зарегистрируйтесь если вы тут впервые</p>
        <img style={{width: '360px', height: '360px'}} src={authImage} alt="authImage" />
        <div className="center flex-column" style={{marginBottom: '50px'}}>
          <button className='auth_button_reg'>Регистрация</button>
          <button className='auth_button_log'>Войти в существующий</button>
        </div>
      </center>

      <center id='register'>
        <h2 className='auth_title'>Ведите номер телефона</h2>
        <p className='auth_text'>Мы отправим 6-значный СМС-код безопасности на ваш номер</p>
        <img style={{width: '360px', height: '360px'}} src={authImage} alt="authImage" />
        <div className="center flex-column" style={{marginBottom: '50px'}}>
          <button className='auth_button_reg'>Регистрация</button>
          <button className='auth_button_log'>Войти в существующий</button>
        </div>
      </center>

      <center id='phone_confirm'>
        <h2 className='auth_title'>Регистрация</h2>
        <p className='auth_text'>Зарегистрируйтесь если вы тут впервые</p>
        <img style={{width: '360px', height: '360px'}} src={authImage} alt="authImage" />
        <div className="center flex-column" style={{marginBottom: '50px'}}>
          <button className='auth_button_reg'>Регистрация</button>
          <button className='auth_button_log'>Войти в существующий</button>
        </div>
      </center>

      <center id='password'>
        <h2 className='auth_title'>Регистрация</h2>
        <p className='auth_text'>Зарегистрируйтесь если вы тут впервые</p>
        <img style={{width: '360px', height: '360px'}} src={authImage} alt="authImage" />
        <div className="center flex-column" style={{marginBottom: '50px'}}>
          <button className='auth_button_reg'>Регистрация</button>
          <button className='auth_button_log'>Войти в существующий</button>
        </div>
      </center>

      <center id='login'>
        <h2 className='auth_title'>Регистрация</h2>
        <p className='auth_text'>Зарегистрируйтесь если вы тут впервые</p>
        <img style={{width: '360px', height: '360px'}} src={authImage} alt="authImage" />
        <div className="center flex-column" style={{marginBottom: '50px'}}>
          <button className='auth_button_reg'>Регистрация</button>
          <button className='auth_button_log'>Войти в существующий</button>
        </div>
      </center>

      <center id='success_reg'>
        <h2 className='auth_title'>Регистрация</h2>
        <p className='auth_text'>Зарегистрируйтесь если вы тут впервые</p>
        <img style={{width: '360px', height: '360px'}} src={authImage} alt="authImage" />
        <div className="center flex-column" style={{marginBottom: '50px'}}>
          <button className='auth_button_reg'>Регистрация</button>
          <button className='auth_button_log'>Войти в существующий</button>
        </div>
      </center>

      <center id='success_login'>
        <h2 className='auth_title'>Регистрация</h2>
        <p className='auth_text'>Зарегистрируйтесь если вы тут впервые</p>
        <img style={{width: '360px', height: '360px'}} src={authImage} alt="authImage" />
        <div className="center flex-column" style={{marginBottom: '50px'}}>
          <button className='auth_button_reg'>Регистрация</button>
          <button className='auth_button_log'>Войти в существующий</button>
        </div>
      </center>
    </>
  )
}

export default AuthPageMobile