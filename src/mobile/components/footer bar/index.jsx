import React from 'react'
import './main.css';
import FooterHomeIcon from '../../layouts/icons/footer_bar_home.svg'
import FooterBasketIcon from '../../layouts/icons/footer_bar_bag.svg'
import FooterProfileIcon from '../../layouts/icons/footer_bar_profile.svg'
import FooterYourDesignIcon from '../../layouts/icons/footer_bar_your_design.svg'
import { NavLink } from 'react-router-dom';

function FooterBarMobile() {
  return (
    <div className='footer_bar'>
      <NavLink to={'/mobile'} style={{textDecoration: 'none'}} className='center flex-column'>
        <img src={FooterHomeIcon} alt="FooterHomeIcon" />
        <p className='footer_bar_text_active'>Главная</p>
      </NavLink>

      <NavLink to={'/mobile/yourDesign'} style={{textDecoration: 'none'}} className='center flex-column'>
        <img src={FooterYourDesignIcon} alt="FooterYourDesignIcon" />
        <p className='footer_bar_text'>Дизайн</p>
      </NavLink>

      <NavLink to={'/basket/mobile'} style={{textDecoration: 'none'}} className='center flex-column'>
        <img src={FooterBasketIcon} alt="FooterBasketIcon" />
        <p className='footer_bar_text'>Корзина</p>
      </NavLink>

      <NavLink to={localStorage.getItem('token') ? '/mobile/profile' : '/mobile/auth'} style={{textDecoration: 'none'}} className='center flex-column'>
        <img src={FooterProfileIcon} alt="FooterProfileIcon" />
        <p className='footer_bar_text'>Профиль</p>
      </NavLink>
    </div>
  )
}

export default FooterBarMobile