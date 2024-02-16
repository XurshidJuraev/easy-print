import React, { useState } from 'react'
import './main.css'
import authImage from '../../layouts/images/43.svg'
import verifed from '../../layouts/images/green_verifed.svg'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

function AuthPageMobile() {
  const token = localStorage.getItem('token');
  const [first, setFirst] = useState(true);
  const [register, setRegister] = useState(false);
  const [phone_confirm, setPhone_confirm] = useState(false);
  const [password, setPassword] = useState(false);
  const [login, setLogin] = useState(false);
  const [success_reg, setSuccess_reg] = useState(false);
  const [success_login, setSuccess_login] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationData, setRegistrationData] = useState({
    name: '',
    password: '',
    passwordConfirmation: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
  
    const { phone } = evt.target.elements;

    const cleanedPhone = phone.value.replace(/\D/g, '');

    setPhoneNumber(cleanedPhone);

    var myHeaders = new Headers();
    myHeaders.append("language", "uz");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");

    var formdata = new FormData();
    formdata.append("phone", cleanedPhone);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_TWO}/phone-register`, requestOptions)
      .then(response => response.text())
      .then(result => {setPhone_confirm(true); setRegister(false);})
      .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setPhone_confirm(false); setRegister(true);});
  }

  const handleOpenCodeVerification = (evt) => {
    evt.preventDefault();
  
    const { code_verify } = evt.target.elements;

    fetch(`${process.env.REACT_APP_TWO}/phone-verify`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        verify_code: code_verify.value.trim(),
      }),
    })
      .then(response => response.json())
      .then(result => {localStorage.setItem('token', result.data.token); setPassword(true); setPhone_confirm(false)})
      .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setPassword(false); setPhone_confirm(true)});
  };

  const handleAddPasword = (evt) => {
    evt.preventDefault();

    if (registrationData.password !== registrationData.passwordConfirmation) {
      setPasswordsMatch(false);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("language", "uz");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");
  
    var formdata = new FormData();
    formdata.append("name", registrationData.name);
    formdata.append("password", registrationData.password);
    formdata.append("password_confirmation", registrationData.passwordConfirmation);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
  
    fetch(`${process.env.REACT_APP_TWO}/register`, requestOptions)
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('user_name', result.data.user.first_name);
        setSuccess_reg(true); setPassword(false);
      })
      .catch(error => {
        toast.error('Регистрация не была оформлена.');
        console.log(error);
        setSuccess_reg(false); setPassword(true)
      });
  };

  return (
    <>
      <center style={{display: first ? 'block' : 'none'}} id='first'>
        <h2 className='auth_title'>Регистрация</h2>
        <p className='auth_text'>Зарегистрируйтесь если вы тут впервые</p>
        <img style={{width: '360px', height: '360px'}} src={authImage} alt="authImage" />
        <div className="center flex-column" style={{marginBottom: '50px'}}>
          <button onClick={() => {setRegister(true); setFirst(false)}} className='auth_button_reg'>Регистрация</button>
          <button onClick={() => {setLogin(true); setFirst(false)}} className='auth_button_log'>Войти в существующий</button>
        </div>
      </center>

      <center style={{display: register ? 'block' : 'none'}} id='register'>
        <form onSubmit={(evt) => { handleSubmitRegister(evt) }}>
          <h2 style={{width: '343px'}} className='auth_title'>Ведите номер телефона</h2>
          <p style={{width: '343px', textAlign: 'left'}} className='auth_text'>Мы отправим 6-значный СМС-код безопасности на ваш номер</p>
          <label style={{width: '343px', display: 'grid', marginTop: '64px'}}>
            <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Номер телефона</p>
            <input name='phone' id='phone' className='register_input' type="text" placeholder='Введите номер телефона' />
          </label>

          <button className='auth_button_reg' style={{marginTop: '320px'}}>Получить код</button>
        </form>
      </center>

      <center style={{display: phone_confirm ? 'block' : 'none'}} id='phone_confirm'>
        <form onSubmit={(evt) => { handleOpenCodeVerification(evt) }}>
          <h2 style={{width: '343px', marginBottom: '48px'}} className='auth_title'>Введите код подтверждения</h2>
          <p style={{width: '343px', textAlign: 'left'}} className='auth_text'>Мы отправили 6-значный СМС-код безопасности на ваш номер</p>
          <label style={{width: '343px', display: 'grid', marginTop: '64px'}}>
            <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Код подтверждения</p>
            <input name='phone' id='code_verify' className='register_input' type="text" placeholder=' _ _ _ _ _ _ ' />
          </label>

          <button className='auth_button_reg' style={{marginTop: '280px'}}>Подтвердить</button>
        </form>
      </center>

      <center style={{display: password ? 'block' : 'none'}} id='password'>
        <h2 className='auth_title'>Регистрация</h2>
        <p className='auth_text'>Введите свои данные</p>
        <form onSubmit={(evt) => { handleAddPasword(evt) }}>
          <label style={{width: '90%', display: 'grid', marginTop: '64px'}}>
            <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Полное имя</p>
            <input name='name' onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})} className='register_input' type="text" placeholder='Введите полное имя' />
          </label>

          <label style={{width: '90%', display: 'grid', marginTop: '32px'}}>
            <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Пароль</p>
            <input name='password' onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})} className='register_input' type="text" placeholder='Придумайте надёжный пароль' />
          </label>

          <label style={{width: '90%', display: 'grid', marginTop: '32px'}}>
            <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Подтвердите пароль</p>
            <input name='passwordConfirmation' onChange={(e) => setRegistrationData({...registrationData,passwordConfirmation: e.target.value,})} className='register_input' type="text" placeholder='Подтвердите пароль' />
          </label>

          {passwordsMatch ? null : (
            <p className='register_text_no_password' style={{color: 'red'}}>Пароли не совпадают</p>
          )}

          <div className="d-flex" style={{marginTop: '20px', marginLeft: '26px'}}>
            <input style={{marginTop: '5px'}} type="checkbox" />
            <p style={{marginLeft: '20px'}}>Я согласен с условиями пользования</p>
          </div>

          <button className='auth_button_reg' style={{marginTop: '132px', marginBottom: '120px'}}>Подтвердить</button>
        </form>
        {/* <button onClick={() => {setSuccess_reg(true); setPassword(false)}} className='auth_button_reg' style={{marginTop: '132px', marginBottom: '120px'}}>Подтвердить</button> */}
      </center>

      <center  style={{display: login ? 'block' : 'none'}} id='login'>
        <h2 className='auth_title'>Авторизация</h2>
        <p className='auth_text'>Введите свои данные</p>
        <label style={{width: '90%', display: 'grid', marginTop: '64px'}}>
          <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Номер телефона</p>
          <input className='register_input' type="text" placeholder='Введите номер телефона' />
        </label>

        <label style={{width: '90%', display: 'grid', marginTop: '32px'}}>
          <p className='register_in_text' style={{textAlign: 'left', marginLeft: '5px'}}>Пароль</p>
          <input className='register_input' type="text" placeholder='Введите пароль' />
        </label>

        <div style={{display: 'flex', justifyContent: 'right', marginRight: '26px', marginTop: '20px'}}>
          <p>Забыли пароль?</p>
        </div>

        <button onClick={() => {setSuccess_login(true); setLogin(false)}} className='auth_button_reg' style={{marginTop: '48px'}}>Подтвердить</button>
      </center>

      <center style={{display: success_reg ? 'block' : 'none'}} id='success_reg'>
        <h2 style={{marginTop: '130px', textAlign: 'center'}} className='auth_title'>Отлично!</h2>
        <p style={{textAlign: 'center'}} className='auth_text'>Вы зарегистрировались успешно</p>
        <img style={{width: '100px', height: '100px', marginTop: '120px'}} src={verifed} alt="authImage" />
        <div className="center flex-column" style={{marginBottom: '120px', marginTop: '120px'}}>
          <button onClick={() => {navigate('/mobile'); setSuccess_reg(false)}} className='auth_button_reg'>Назад на главную</button>
        </div>
      </center>

      <center style={{display: success_login ? 'block' : 'none'}} id='success_login'>
        <h2 style={{marginTop: '130px', textAlign: 'center'}} className='auth_title'>Отлично!</h2>
        <p style={{textAlign: 'center'}} className='auth_text'>Вы вошли в свой личный кабинет</p>
        <img style={{width: '100px', height: '100px', marginTop: '120px'}} src={verifed} alt="authImage" />
        <div className="center flex-column" style={{marginBottom: '120px', marginTop: '120px'}}>
          <button onClick={() => {navigate('/mobile'); setSuccess_login(false)}} className='auth_button_reg'>Назад на главную</button>
        </div>
      </center>
    </>
  )
}

export default AuthPageMobile