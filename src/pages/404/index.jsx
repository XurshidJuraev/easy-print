import React, { useEffect, useLayoutEffect, useState } from 'react'
import HeaderMain from '../../components/header'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';
import Reveal from '../../animation';
import Image404 from '../../layouts/images/404.svg'
import { NavLink, useNavigate } from 'react-router-dom';

function Error404() {
  const [trashCardData, setTrashCardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.screen.width < 800) {
        navigate('/mobile/404');
      }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    document.title = 'Не найдено';
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

      <center style={{marginTop: '94px'}}>
        <Reveal>
          <img src={Image404} alt="Image404" />
        </Reveal>

        <Reveal>
          <h1 className='notWorkingTitle'>Уупс - что-то пошло не так!</h1>
        </Reveal>
        <Reveal>
          <p className='notWorkingText'>К сожалению мы не нашли нужную вам страницу. </p>
        </Reveal>
        <Reveal>
          <NavLink to={'/'} className='notWorkingButton'>Назад на главную</NavLink>
        </Reveal>
      </center>

      <AdvantageMain />
      <FooterMain />
    </>
  )
}

export default Error404