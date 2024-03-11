import React, { useEffect, useState } from 'react'
import './main.css'
import logo from '../../layouts/icons/logo.svg'
import search_mobile from '../../layouts/icons/search_mobile.svg'
import burger_meny from '../../layouts/icons/burger_meny.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function HeaderMainMobile() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState(null);
  const [categoryShow, setCategoryShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  if (!localStorage.getItem('selectedLanguage')) {
    localStorage.setItem('selectedLanguage', 'ru')
  }

  // useEffect(() => {
  //   const checkScreenSize = () => {
  //     if (window.screen.width < 800) {
  //       navigate(`/${window.location.pathname}`);
  //     }
  //   };

  //   checkScreenSize();

  //   window.addEventListener('resize', checkScreenSize);

  //   return () => {
  //     window.removeEventListener('resize', checkScreenSize);
  //   };
  // }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/anime-category-size-color`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setCategory(response.data.data.category);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleHumburgerMenuClick = () => {
    setCategoryShow((prev) => !prev);
  };

  const handleSearchClick = () => {
    setSearchShow((prev) => !prev);
  };

  return (
    <header>
      <div style={{width: '100%', display: 'flex', paddingTop: '16px', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px'}}>
        <img onClick={handleHumburgerMenuClick} src={burger_meny} alt="burger_meny" />
        <NavLink to={'/mobile'}>
          <img src={logo} alt="logo" />
        </NavLink>
        <img onClick={handleSearchClick} src={search_mobile} alt="search_mobile" />
      </div>

      {categoryShow && (
        <>
          <div style={{backgroundColor: 'white', position: 'absolute', width: '100%', zIndex: 100000}}>
            {category && category.map((item, index) => (
              <button className='header_button_mobile' key={index}>{item.name}</button>
            ))}
          </div>

          <div onClick={handleHumburgerMenuClick} style={{backgroundColor: '#0101011A', position: 'absolute', width: '100%', height: '100%', zIndex: 10000}}></div>
        </>
      )}  

      {searchShow && (
        <center>
          <div style={{paddingLeft: '20px', paddingRight: '20px', position: 'absolute', width: '100%', top: '9px'}}>
            <div className='d-flex'>
              <img onClick={handleHumburgerMenuClick} src={burger_meny} alt="burger_meny" />
              <input placeholder='Поиск...' className='search_input_mobile' type="text" />
            </div>
          </div>

          <img style={{position: 'absolute', top: '20px', right: '32px', width: '24px', height: '24px'}} onClick={handleSearchClick} src={search_mobile} alt="search_mobile" />
        </center>
      )}
    </header>
  )
}

export default HeaderMainMobile