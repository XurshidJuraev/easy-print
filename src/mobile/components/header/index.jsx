import React, { useEffect, useState } from 'react'
import './main.css'
import logo from '../../layouts/icons/logo.svg'
import search_mobile from '../../layouts/icons/search_mobile.svg'
import burger_meny from '../../layouts/icons/burger_meny.svg'
import axios from 'axios'
import { toast } from 'react-toastify'

function HeaderMainMobile() {
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState(null);

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

  return (
    <header>
      <div style={{width: '100%', display: 'flex', paddingTop: '16px', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px'}}>
        <img src={burger_meny} alt="burger_meny" />
        <img src={logo} alt="logo" />
        <img src={search_mobile} alt="search_mobile" />
      </div>

      <div style={{backgroundColor: 'white'}}>
        {category && category.map((item, index) => (
          <button className='header_button_mobile' key={index}>{item.name}</button>
        ))}
      </div>
    </header>
  )
}

export default HeaderMainMobile