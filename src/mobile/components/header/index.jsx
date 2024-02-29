import React, { useEffect, useState } from 'react'
import './main.css'
import logo from '../../layouts/icons/logo.svg'
import search_mobile from '../../layouts/icons/search_mobile.svg'
import burger_meny from '../../layouts/icons/burger_meny.svg'
import { NavLink, useNavigate } from 'react-router-dom'

function HeaderMainMobile() {
  const navigate = useNavigate();

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

  return (
    <header>
      <div style={{width: '100%', display: 'flex', paddingTop: '16px', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px'}}>
        <img src={burger_meny} alt="burger_meny" />
        <NavLink to={'/mobile'}>
          <img src={logo} alt="logo" />
        </NavLink>
        <img src={search_mobile} alt="search_mobile" />
      </div>
    </header>
  )
}

export default HeaderMainMobile