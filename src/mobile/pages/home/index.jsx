import React, { useEffect, useState } from 'react'
import HeaderMainMobile from '../../components/header'
import HeroMainMobile from '../../components/hero'
import FooterMainMobile from '../../components/footer'
import FooterBarMobile from '../../components/footer bar'
import blueVerifed from '../../layouts/icons/blue_verifed.svg'
import blueBuds from '../../layouts/icons/operator.svg'
import blueTruck from '../../layouts/icons/truck.svg'
import axios from 'axios';
import './main.css';
import { useNavigate } from 'react-router-dom'

function HomePageMobile() {
  const [data, setData] = useState(0);
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-warehouses`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      console.log(response.data.data.warehouse_product_list);
      setData(response.data);
    }).catch((error) => {
      console.log(error);
    });    
  }, []);

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

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 800) {
        navigate('/mobile');
      }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div style={{backgroundColor: '#ffffff'}}>
      <HeaderMainMobile />
      <div style={{backgroundColor: 'white'}}>
        {category && category.map((item, index) => (
          <button className='header_button_mobile' key={index}>{item.name}</button>
        ))}
      </div>
      <HeroMainMobile />

      <center>
        <h2 className='home_card_title_mobile'>Рекомендуем вам:</h2>

        <div className="d-flex" style={{width: '344px', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {data.data ? data.data.warehouse_product_list.slice(3).map((data2) => (
            <div style={{textDecoration: 'none', marginBottom: '32px'}}>
              <div className="clothes_fat">
                <div className="image-container" style={{position: 'relative', zIndex: '200'}}>
                  <div>
                    <div style={{width: '162px', height: '190px', backgroundImage: `url(${data2.images[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <div>
                  <p className='home_card_price'>{Number(data2.price).toLocaleString('ru-RU')} сум</p>
                  <p className='home_card_title' title={data2.name}>{data2.name}</p>
                </div>
              </div>
            </div>
          )): null}
        </div>
      </center>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3 className='advantage_main_text_mobile'>Наше преимущество</h3>

        <div className='d-flex justify-content-between flex-column'>
          <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px'}} className='advantage_cards'>
            <img src={blueVerifed} alt="blueVerifed" />

            <h3 className='advantage_theme_mobile'>Гарантия качества</h3>
            <p className='advantage_text_mobile'>Качественные экологичные <br /> материалы</p>
          </div>

          <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px', marginTop: '-50px'}} className='advantage_cards'>
            <img src={blueTruck} alt="blueVerifed" />

            <h3 className='advantage_theme_mobile'>Быстрая доставка</h3>
            <p className='advantage_text_mobile'>Доставка по всему <br /> Узбекистану</p>
          </div>

          <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px', marginTop: '-50px'}} className='advantage_cards'>
            <img src={blueBuds} alt="blueVerifed" />

            <h3 className='advantage_theme_mobile'>Сервис</h3>
            <p className='advantage_text_mobile'>Лёгкий процесс оплаты, <br /> обмена и возврата</p>
          </div>
        </div>
      </div>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default HomePageMobile