import React, { useEffect, useState } from 'react'
import './main.css'
import logo from '../../layouts/icons/logo.svg'
import search_mobile from '../../layouts/icons/search_mobile.svg'
import burger_meny from '../../layouts/icons/burger_meny.svg'
import axios from 'axios'
import { toast } from 'react-toastify'

function HeaderMainMobile() {
  return (
    <header>
      <div style={{width: '100%', display: 'flex', paddingTop: '16px', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px'}}>
        <img src={burger_meny} alt="burger_meny" />
        <img src={logo} alt="logo" />
        <img src={search_mobile} alt="search_mobile" />
      </div>
    </header>
  )
}

export default HeaderMainMobile