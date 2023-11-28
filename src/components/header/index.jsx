import React, { useEffect, useState } from 'react'
import './main.css'
import logo from '../../layouts/icons/logo.svg'
import search from '../../layouts/icons/search.svg'
import bag from '../../layouts/icons/bag.svg'
import user from '../../layouts/icons/User.svg'
import language from '../../layouts/icons/language.svg'
import register_image from '../../layouts/images/43.svg'
import google from '../../layouts/images/google.svg'
import facebook from '../../layouts/images/facebook.svg'
import verifed from '../../layouts/images/green_verifed.svg'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

function HeaderMain({ trashCardData }) {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const token = localStorage.getItem('token');
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || '');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeLinkId, setActiveLinkId] = useState(null);

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();

    const { user_email, user_password } = evt.target.elements;

    fetch(`${process.env.REACT_APP_TWO}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: user_email.value.trim(),
        password: user_password.value.trim(),
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status === true) {
          document.getElementById('exampleModalToggle3').classList.add('show');
          document.body.classList.add('modal-open');
          localStorage.setItem('token', result.data.token);
        } else {
          console.log("Login failed"); // Masalan, xabar chiqaring yoki boshqa muvofiqlikni ko'rsating
        }
      })      
      .catch(error => console.log('error', error));
  };

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
  
    const { user_name, user_email, user_password, user_password_confirmation } = evt.target.elements;
  
    fetch(`${process.env.REACT_APP_TWO}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: user_name.value.trim(),
        email: user_email.value.trim(),
        password: user_password.value.trim(),
        password_confirmation: user_password_confirmation.value.trim(),
      }),
    })
      .then(response => response.json())
      .then(result => {console.log(result)})      
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/profile-info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }).then((response) => {
      localStorage.setItem('basket_count', response.data.data.basket_count)
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  const basket_count_localstorage = localStorage.getItem('basket_count');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-products-by-categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }).then((response) => {
      console.log(response.data);
      setCategory(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLang = event;
    setSelectedLanguage(selectedLang);
    localStorage.setItem('selectedLanguage', selectedLang);
    toggleLanguageDropdown();
  };  

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const handleGoogleAuthRedirect = () => {
    window.location.href = 'http://admin.easyprint.uz/api/googleauth';
  };

  return (
    <header style={{backgroundColor: '#ffffff'}} className="navbar navbar-expand-lg bg-body-tertiary">
      <div style={{ margin: '12px 120px' }} className="container-fluid">
        <NavLink to={'/'} className="navbar-brand">
          <img src={logo} alt="logo" />
        </NavLink>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: '50px', fontFamily: 'Inter' }}>
            {category.data && category.data.map((data2) => (
              <li key={data2.id} className="nav-item ms-3 me-3">
                <a
                  href={`/categories/${data2.id}`}
                  className={`nav-link ${activeLinkId === data2.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveLinkId(data2.id)}
                  onMouseLeave={() => setActiveLinkId(null)}
                >
                  {data2.name}
                </a>

                <div className={`language_list language_list_${data2.subcategory.id}`}>
                  <NavLink to={`/categories/${data2.subcategory.id}`} className='language_item'>{data2.subcategory.name}</NavLink>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex">
            <div className='header_search'>
              <center>
                <input
                  className="header_search_input"
                  type="search"
                  placeholder="Поиск..."
                  aria-label="Поиск..."
                />
                <img src={search} alt="search" />
              </center>
            </div>
            <div className="d-flex">
              <button onClick={toggleLanguageDropdown} style={{backgroundColor: 'transparent', border: 'none'}}>
                <img onClick={toggleLanguageDropdown} src={language} alt="user" />
              </button>

              {showLanguageDropdown && (
                <div
                  value={selectedLanguage}
                  style={{
                    border: 'none',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '70px',
                    right: '225px',
                  }}
                >
                  {data.data &&
                    data.data.language &&
                    data.data.language.map((lang) => (
                      <div onClick={() => handleLanguageChange(lang.code)} value={lang.code} className='language_item' key={lang.id}>
                        {lang.name}
                      </div>
                    ))}
                </div>
              )}

              <NavLink to={'/basket'} className='basket_counter_father'>
                <div className='basket_counter'>{basket_count_localstorage}</div>
                <button style={{backgroundColor: 'transparent', border: 'none', position: 'absolute', zIndex: '1', marginTop: '-4px', marginLeft: '6px'}}><img src={bag} alt="bag" /></button>
              </NavLink>

              {localStorage.getItem('token') ? (
                <NavLink to={'/profile'} style={{marginTop: '14px'}}>
                  <button style={{backgroundColor: 'transparent', border: 'none'}}>
                    <img src={user} alt="user" />
                  </button>                
                </NavLink>
              ) : (
                <button style={{backgroundColor: 'transparent', border: 'none'}} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                  <img src={user} alt="user" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '12px', border: 'none'}}>
          <div className="modal-content" style={{borderRadius: '12px', border: 'none'}}>
            <div className="modal-body" style={{padding: '32px'}}>
              <center>
                <h2 className='register_title'>Регистрация</h2>
                <p className='register_text'>Зарегистрируйтесь если вы тут впервые</p>

                <img src={register_image} alt={register_image} />
              </center>

                <button data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" className='register'>Регистрация</button>
                <button data-bs-target="#exampleModalToggle4" data-bs-toggle="modal" className='login'>Войти в существующий</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '12px', border: 'none'}}>
          <div className="modal-content" style={{borderRadius: '12px', border: 'none'}}>
            <div className="modal-body" style={{padding: '32px'}}>
              <form onSubmit={handleSubmitRegister}>
                <center>
                  <h2 className='register_title'>Регистация</h2>
                  <p className='register_text'>Введите свои данные</p>
                </center>

                <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                  <p className='register_in_text'>Имя</p>
                  <input name='user_name' id='emailInput' className='register_input' type="text" placeholder='Введите имя' />
                </label>

                <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                  <p className='register_in_text'>E-mail или номер телефона</p>
                  <input name='user_email' id='emailInput' className='register_input' type="text" placeholder='Введите адрес эл. почты или номер телефона' />
                </label>

                <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                  <p className='register_in_text'>Пароль</p>
                  <input name='user_password' id='passwordInput' className='register_input' type="password" placeholder='Введите пароль' />
                </label>

                <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                  <p className='register_in_text'>Подтвердите пароль</p>
                  <input name='user_password_confirmation' id='passwordInput2' className='register_input' type="password" placeholder='Подтвердите пароль' />
                </label>

                <label className='d-flex mt-4'>
                  <input style={{width: '24px', height: '24px', borderRadius: '10px'}} type="checkbox" name="" id="agreeCheckbox" />
                  <p style={{marginLeft: '15px'}} className='register_in_text'>Я согласен с условиями пользования</p>
                </label>

                <button data-bs-target='exampleModalToggle3' data-bs-toggle="modal" className='register'>
                  Регистрация
                </button>
                <div className='d-flex'>
                  <div style={{width: '179.5px', marginRight: '16px', height: '1px', backgroundColor: 'var(--neutral-200, #E6E6E6)', marginTop: '16px'}}></div>
                  <p className='register_and_text'>или</p>
                  <div style={{width: '179.5px', marginLeft: '16px', height: '1px', backgroundColor: 'var(--neutral-200, #E6E6E6)', marginTop: '16px'}}></div>
                </div>

                <div className="d-flex justify-content-between">
                  <img onClick={handleGoogleAuthRedirect} src={google} alt="google" />
                  <img src={facebook} alt="facebook" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '12px', border: 'none'}}>
          <div className="modal-content" style={{borderRadius: '12px', border: 'none'}}>
            <div className="modal-body" style={{padding: '32px'}}>
              <center>
                <h2 className='register_title'>Отлично!</h2>
                <p className='register_text'>Вы вошли в свой личный кабинет</p>
                <img src={verifed} alt="verifed" />
              </center>

              <button data-bs-dismiss="modal" className='register'>Назад на главную</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModalToggle4" aria-hidden="true" aria-labelledby="exampleModalToggleLabel4" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '12px', border: 'none'}}>
          <div className="modal-content" style={{borderRadius: '12px', border: 'none'}}>
            <div className="modal-body" style={{padding: '32px'}}>
              <form onSubmit={handleSubmitLogin} action="">
                <center>
                  <h2 className='register_title'>Авторизация</h2>
                  <p className='register_text'>Введите свои данные</p>
                </center>

                <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                  <p className='register_in_text'>E-mail </p>
                  <input name='user_email' className='register_input' type="text" placeholder='Введите адрес электронной почты' />
                </label>

                <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                  <p className='register_in_text'>Пароль</p>
                  <input name='user_password' className='register_input' type="password" placeholder='Введите пароль' />
                </label>

                <p className='register_text_no_password'></p>

                <div style={{textAlign: 'right'}}>
                  <p className='register_text_no_password'>Забыли пароль?</p>
                </div>

                <button data-bs-target='exampleModalToggle3' data-bs-toggle="modal" className='register'>Регистрация</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderMain