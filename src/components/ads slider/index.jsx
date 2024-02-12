import React from 'react';
import default_ads from '../../layouts/images/Author_default.svg';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './main.css';
import { NavLink } from 'react-router-dom';

function AdsSlider() {
  const slideImages = [
    {
      url: default_ads,
      link: 'https://apple.com'
    },
    {
      url: default_ads,
      link: 'https://apple.com'
    },
    {
      url: default_ads,
      link: 'https://apple.com'
    },
  ];

  return (
    <center>
      <div style={{width: '94%'}}>
        <div className="slide-container" style={{ textAlign: 'center' }}>
          <Slide prevArrow={null} nextArrow={null} duration={3000} transitionDuration={800}>
            {slideImages.map((slideImage, index) => (
              <div className="each-slide" key={index}>
                <div style={{ marginTop: '20px', marginBottom: '92px' }}>
                  <NavLink target='_blank' to={slideImage.link}>
                    <img style={{ width: '100%', borderRadius: '12px' }} src={slideImage.url} alt={slideImage.caption} />
                  </NavLink>
                </div>
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </center>
  );
}

export default AdsSlider;