import React, {useState} from 'react'
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

function HeaderMain({ trashCardData }) {
  const [dataBs, setDataBs] = useState('#exampleModalToggle3')
  const [selectedImage, setSelectedImage] = useState(null);

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(32)
    );
  }

  const handleImageSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const selectedImage = e.target.result;
        localStorage.setItem('selectedImage', selectedImage);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  console.log('Image selected; file: ' + selectedImage)

  const saveUserCredentials = (email, password) => {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('token', uuidv4());
    localStorage.setItem('loginTime', new Date().toString());
    if (selectedImage) {
      localStorage.setItem('userImage', selectedImage);
    }
  };

  return (
    <header className="navbar navbar-expand-lg bg-body-tertiary" style={{boxShadow: '1px 5px 31px -14px rgba(0,0,0,0.72)'}}>
      <div style={{ margin: '12px 120px' }} className="container-fluid">
        <NavLink to={'/'} className="navbar-brand" href="#">
          <img src={logo} alt="logo" />
        </NavLink>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: '50px', fontFamily: 'Inter' }}>
            <li className="nav-item ms-3 me-3">
              <a className="nav-link" href="#">
                Футболки
              </a>
            </li>

            <li className="nav-item ms-3 me-3">
              <a className="nav-link" href="#">
                Лонгсливы
              </a>
            </li>

            <li className="nav-ite ms-3 me-3">
              <a className="nav-link" href="#">
                Худи
              </a>
            </li>

            <li className="nav-item ms-3 me-3">
              <a className="nav-link" href="#">
                Аксессуары
              </a>
            </li>
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
              <button style={{backgroundColor: 'transparent', border: 'none'}}>
                <img src={language} alt="user" />
              </button>

              <NavLink to={'/basket'} className='basket_counter_father'>
                <div className='basket_counter'>{trashCardData.length}</div>
                <button style={{backgroundColor: 'transparent', border: 'none', position: 'absolute', zIndex: '1', marginTop: '-4px', marginLeft: '6px'}}><img src={bag} alt="bag" /></button>
              </NavLink>

              {localStorage.getItem('email') ? (
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

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                  value={selectedImage}
                />
                
                <button
                  className='register_image_button'
                  onClick={() => {
                    const fileInput = document.querySelector('input[type="file"]');
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                  style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                >
                  {selectedImage ? <img src={selectedImage} alt="register_image" /> : <img src={register_image} alt="register_image" />}
                </button>
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
              <center>
                <h2 className='register_title'>Регистация</h2>
                <p className='register_text'>Введите свои данные</p>
              </center>

              <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                <p className='register_in_text'>E-mail или номер телефона</p>
                <input id='emailInput' className='register_input' type="text" placeholder='Введите адрес эл. почты или номер телефона' />
              </label>

              <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                <p className='register_in_text'>Пароль</p>
                <input id='passwordInput' className='register_input' type="password" placeholder='Введите пароль' />
              </label>

              <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                <p className='register_in_text'>Подтвердите пароль</p>
                <input id='passwordInput2' className='register_input' type="password" placeholder='Подтвердите пароль' />
              </label>

              <label className='d-flex mt-4'>
                <input
                  style={{width: '24px', height: '24px', borderRadius: '10px'}}
                  type="checkbox"
                  name=""
                  id="agreeCheckbox"
                />
                <p style={{marginLeft: '15px'}} className='register_in_text'>Я согласен с условиями пользования</p>
              </label>

              <button
                data-bs-target={dataBs}
                data-bs-toggle="modal"
                className='register'
                onClick={() => {
                  const emailInput = document.getElementById('emailInput');
                  const passwordInput = document.getElementById('passwordInput');
                  const agreeCheckbox = document.getElementById('agreeCheckbox');

                  const email = emailInput.value;
                  const password = passwordInput.value;
                  const agree = agreeCheckbox.checked;

                  if (email && password && agree) {
                    saveUserCredentials(email, password);  
                    setDataBs('#exampleModalToggle3')          
                  } else {
                    alert('Iltimos, email, parol va rozilik belgisini to\'ldiring!');
                    setDataBs('#exampleModalToggle2')
                  }
                }}
              >
                Регистрация
              </button>
              <div className='d-flex'>
                <div style={{width: '179.5px', marginRight: '16px', height: '1px', backgroundColor: 'var(--neutral-200, #E6E6E6)', marginTop: '16px'}}></div>
                <p className='register_and_text'>или</p>
                <div style={{width: '179.5px', marginLeft: '16px', height: '1px', backgroundColor: 'var(--neutral-200, #E6E6E6)', marginTop: '16px'}}></div>
              </div>

              <div className="d-flex justify-content-between">
                <img src={google} alt="google" />
                <img src={facebook} alt="facebook" />
              </div>
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
              <center>
                <h2 className='register_title'>Авторизация</h2>
                <p className='register_text'>Введите свои данные</p>
              </center>

              <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                <p className='register_in_text'>E-mail </p>
                <input className='register_input' type="text" placeholder='Введите адрес электронной почты' />
              </label>

              <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                <p className='register_in_text'>Пароль</p>
                <input className='register_input' type="password" placeholder='Введите пароль' />
              </label>

              <div style={{textAlign: 'right'}}>
                <p className='register_text_no_password'>Забыли пароль?</p>
              </div>

              <button data-bs-target="#exampleModalToggle3" data-bs-toggle="modal"className='register'>Регистрация</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderMain