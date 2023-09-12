import React, { useEffect, useRef } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Slide1 from '../../layouts/images/Slide_default.svg'
import Slide2 from '../../layouts/images/Slide_two.svg'
import './main.css';
import { NavLink } from 'react-router-dom';

function HeroMain() {
  const splideRef = useRef(null);

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

  return (
    <div>
      <div className="splide" ref={splideRef}>
        <div className="splide__track">
          <ul className="splide__list">
            <li className="splide__slide"><NavLink><img src={Slide1} alt="Slide1" /></NavLink></li>
            <li className="splide__slide"><NavLink><img src={Slide2} alt="Slide2" /></NavLink></li>
            <li className="splide__slide"><NavLink><img src={Slide1} alt="Slide1" /></NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeroMain;