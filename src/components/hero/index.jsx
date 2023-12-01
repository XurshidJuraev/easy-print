import React, { useEffect, useRef, useState } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { CSSTransition } from 'react-transition-group';
import './main.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function HeroMain() {
  const splideRef = useRef(null);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = localStorage.getItem('token');
  const numberOfImages = 3;

  useEffect(() => {
    if (splideRef.current) {
      new Splide(splideRef.current, {
        type: 'loop',
        padding: {
          left: '140px',
          right: '140px',
        },
        pagination: false,
      }).mount();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TWO}/get-banner`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [data]);

  const handleImageClick = (index) => {
    // Handle the click event
    if (splideRef.current) {
      splideRef.current.go(index);
    }
  };

  return (
    <div>
      {data.length > 0 && (
        <CSSTransition in={true} appear={true} timeout={300} classNames="hero-fade">
          <div style={{ width: '100%', height: '900px' }} className='d-flex justify-content-between'>
            <div style={{ paddingTop: '160px', paddingLeft: '120px' }}>
              <h1 className='hero_title'>{data[currentIndex].title}</h1>
              <p className='hero_text'>{data[currentIndex].text}</p>
              <NavLink to={'/yourDesign'} className='hero_button'>
                <span>Напечатать свой дизайн</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path d="M22.5 13.0039C22.4951 12.4774 22.2832 11.9741 21.91 11.6029L17.62 7.29979C17.4326 7.11341 17.1792 7.00879 16.915 7.00879C16.6508 7.00879 16.3974 7.11341 16.21 7.29979C16.1163 7.39282 16.0419 7.5035 15.9911 7.62545C15.9403 7.7474 15.9142 7.8782 15.9142 8.0103C15.9142 8.14241 15.9403 8.27321 15.9911 8.39516C16.0419 8.5171 16.1163 8.62778 16.21 8.72081L19.5 12.0032H3.5C3.23478 12.0032 2.98043 12.1086 2.79289 12.2963C2.60536 12.484 2.5 12.7385 2.5 13.0039C2.5 13.2693 2.60536 13.5238 2.79289 13.7115C2.98043 13.8992 3.23478 14.0046 3.5 14.0046H19.5L16.21 17.297C16.0217 17.4841 15.9154 17.7384 15.9144 18.004C15.9135 18.2695 16.018 18.5246 16.205 18.713C16.392 18.9015 16.6461 19.0078 16.9115 19.0088C17.1768 19.0097 17.4317 18.9051 17.62 18.718L21.91 14.4149C22.2856 14.0413 22.4978 13.5339 22.5 13.0039Z" fill="white"/>
                </svg>
              </NavLink>
            </div>
            <div>
              <div>
                <img style={{ width: '800px', height: '900px' }} src={data[currentIndex].banner_image} alt={data[currentIndex].title} />
              </div>

              <div className="d-flex" style={{ position: 'relative', top: '-600px', right: '0px' }}>
                {data[currentIndex] && data[currentIndex].carousel_image.slice(0, numberOfImages).map((data2, index) => (
                  <div key={data2} className={`${ index === 0 ? 'left-image' : index === numberOfImages - 1 ? 'right-image' : 'center-image' }`} style={{ maxWidth: '140px', maxHeight: '310px', marginRight: '10px' }} onClick={() => handleImageClick(index)}
                  >
                    <img src={data2} alt={data[currentIndex].title} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CSSTransition>
      )}
    </div>
  );
}

export default HeroMain;