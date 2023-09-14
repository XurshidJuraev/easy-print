import React, { useEffect, useState } from 'react'
import './main.css'
import HeaderMain from '../../components/header'
import HeroMain from '../../components/hero'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import your_design from '../../layouts/images/your_design.svg'
import design1 from '../../layouts/images/gifts_for_him.svg'
import design2 from '../../layouts/images/trump.svg'
import like from '../../layouts/icons/like.svg'
import bag from '../../layouts/icons/active_bag_icon.svg'

function HomePage() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [count, setCount] = useState(1);

  function handleCardClick(imageSrc, name, price) {
    const currentTime = new Date();
    const clickedCardData = {
      id: idCounter,
      count: count,
      imageSrc,
      name,
      price,
      timestamp: currentTime.toString(),
    };

    setCount(1)

    setIdCounter((prevId) => prevId + 1);

    setTrashCardData((prevData) => [...prevData, clickedCardData]);

    localStorage.setItem('trashCard', JSON.stringify([...trashCardData, clickedCardData]));

    toast.success(`${name} в корзину`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />
      <HeroMain />

      <ToastContainer />
      
      <section className='container' style={{marginTop: '24px', margin: '24px 100px'}}>
        <center>
          <h2 className='products_father_text'>Хиты Продаж</h2>
        </center>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
          <div className="cards">
            <img src={your_design} alt="your_design" />

            <div className="d-flex justify-content-between mt-3">
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(your_design, 'Футболка с вашим принтом', '140 000')}>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards">
            <div>
              <img style={{position: 'absolute', zIndex: '1', borderRadius: '20px'}} src={design2} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Футболка с вашим принтом', '140 000')}>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design1} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design1, 'Футболка с вашим принтом', '140 000')}>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1', borderRadius: '20px'}} src={design2} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Футболка с вашим принтом', '140 000')}>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design1} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design1, 'Футболка с вашим принтом', '140 000')}>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1', borderRadius: '20px'}} src={design2} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Футболка с вашим принтом', '140 000')}>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design1} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design1, 'Футболка с вашим принтом', '140 000')}>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1', borderRadius: '20px'}} src={design2} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Футболка с вашим принтом', '140 000')}>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-4">
            <div>
              <img style={{position: 'absolute', zIndex: '1'}} src={design1} alt="your_design" />
              <img style={{position: 'relative', zIndex: '2', left: '340px', top: '10px'}} src={like} alt="your_design" />
            </div>

            <div className="d-flex justify-content-between" style={{marginTop: '373px'}}>
              <div>
                <p className='t-shirt_name'>Футболка с вашим принтом </p>
                <p className='t-shirt_price'>От 140 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design1, 'Футболка с вашим принтом', '140 000')}>
                <img src={bag} alt="bag" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdvantageMain />
      <FooterMain />
    </>
  )
}

export default HomePage