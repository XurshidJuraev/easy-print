import React, { useEffect, useLayoutEffect, useState } from 'react'
import HeaderMain from '../../components/header'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';
import Image404 from '../../layouts/images/404.svg'
import { NavLink } from 'react-router-dom';

function Error404() {
  const [trashCardData, setTrashCardData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0)
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
        <img src={Image404} alt="Image404" />

        <h1 className='notWorkingTitle'>Уупс - что-то пошло не так!</h1>
        <p className='notWorkingText'>К сожалению мы не нашли нужную вам страницу. </p>
        <NavLink to={'/'} className='notWorkingButton'>Назад на главную</NavLink>
      </center>

      <AdvantageMain />
      <FooterMain />
    </>
  )
}

export default Error404