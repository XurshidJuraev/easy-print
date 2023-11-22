import React, { useEffect, useState } from 'react'
import './main.css'
import HeaderMain from '../../components/header'
import HeroMain from '../../components/hero'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import your_design from '../../layouts/images/your_design.svg'
import bag from '../../layouts/icons/active_bag_icon.svg'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

function HomePage() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [count, setCount] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSize, setSelectedSize] = useState('s');
  const [selectedColor, setSelectedColor] = useState('#D9CCC6');
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  function handleCardClick(imageSrc, name, price, selectedSize, selectedColor) {
    const currentTime = new Date();
    const clickedCardData = {
      id: idCounter,
      count: count,
      imageSrc,
      selectedSize,
      selectedColor,
      name,
      price,
      timestamp: currentTime.toString(),
    };
  
    if (count > 1) {
      setCount(count - 1);
    }
  
    setIdCounter((prevId) => prevId + 1);
  
    setTrashCardData((prevData) => [...prevData, clickedCardData]);
  
    localStorage.setItem('trashCard', JSON.stringify([...trashCardData, clickedCardData]));
  
    toast.success(`${name} в корзину`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }  

  function handleCardShow(imageSrc, name, price) {
    const currentTime = new Date();
    const clickedCardData = {
      imageSrc,
      name,
      price,
      timestamp: currentTime.toString(),
    };

    console.log(clickedCardData);
  
    localStorage.setItem('showDetail', JSON.stringify(clickedCardData));
    // navigate('/show/detail');
  }  

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-warehouses`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }).then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.log(error);
    });    
  }, []);

  function openModal(cardData) {
    setSelectedCard(cardData);
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />
      <HeroMain />

      <ToastContainer />
      
      <section className='container' style={{marginTop: '24px', margin: '24px 100px'}}>
        <h2 className='products_father_text mb-3'>Хиты Продаж</h2>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
          <div className="cards your_print">
            <NavLink to={'/yourDesign'} className="image-container" style={{position: 'relative'}}>
                <img src={your_design} alt="your_design" />
                <div className="image-overlay">
                  <div className="detail_back">
                    <p className="overlay-text">Свой дизайн</p>
                  </div>
                </div>
              </NavLink>

            <div className="d-flex justify-content-between mt-3">
              <div>
                <p className='t-shirt_name'>Одежда с вашим дизайном</p>
                <p className='t-shirt_price'>От 120 000 сум</p>
              </div>
            </div>
          </div>

          {data.data ? data.data.warehouse_product_list.slice(0, 3).map((data2) => (
            <div key={data2.id}>
              <div className="cards">
                <NavLink to={`/product/${data2.id}`} onClick={() => handleCardShow(`${data2.images[0]}`, `${data2.name}`, `${data2.price}`)} className="clothes_fat">
                  <div className="image-container" style={{position: 'relative'}}>
                    <img style={{ borderRadius: '20px', width: '276px', height: '320px' }} src={`${data2.images[0]}`} alt={data2.name} />
                    <div className="image-overlay">
                      <div className="detail_back">
                        <p className="overlay-text">Посмотреть детали</p>
                      </div>
                    </div>
                  </div>
                </NavLink>

                <div className="d-flex">
                  <div>
                    <p className='t-shirt_name'>{data2.name}</p>
                    <p className='t-shirt_price'>{data2.price} сум</p>
                  </div>

                  <div onClick={() => openModal({imageSrc: `${data2.images[0]}`, name: `${data2.name}`, price: `${data2.price}`})} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img style={{cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px'}} src={bag} alt="bag" />
                  </div>
                </div>
              </div>
            </div>
          )): null}

          {data.data ? data.data.warehouse_product_list.slice(3).map((data2) => (
            <div key={data2.id}>
              <div className="cards">
                <div onClick={() => handleCardShow(`${data2.images[0]}`, `${data2.name}`, `${data2.price}`)} className="clothes_fat">
                  <div className="image-container" style={{position: 'relative'}}>
                    <img style={{ borderRadius: '20px', width: '276px', height: '320px' }} src={`${data2.images[0]}`} alt={data2.name} />
                    <div className="image-overlay">
                      <div className="detail_back">
                        <p className="overlay-text">Посмотреть детали</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex">
                  <div>
                    <p className='t-shirt_name'>{data2.name}</p>
                    <p className='t-shirt_price'>{data2.price} сум</p>
                  </div>

                  <div onClick={() => openModal({imageSrc: `${data2.images[0]}`, name: `${data2.name}`, price: `${data2.price}`})} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img style={{cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px'}} src={bag} alt="bag" />
                  </div>
                </div>
              </div>
            </div>
          )): null}
        </div>
      </section>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{borderRadius: '0px'}}>
            <div className="modal-body" style={{padding: '0'}}>
              {selectedCard && (
                <div className='d-flex'>
                  <div style={{padding: '80px 32px 0px 32px'}}>
                    <p className='modal_name'>{selectedCard.name}</p>
                    <p className='modal_info'>{selectedCard.name} с круглым вырезом и с принтом Kiikii</p>
                    <p className='modal_price'>{selectedCard.price} сум</p>

                    <div className="d-flex justify-content-between" style={{marginTop: '57px'}}>
                      <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Размер <span style={{textTransform: 'uppercase', marginLeft: '12px'}}>{selectedSize} <span className='ms-1' style={{fontSize: '12px', marginTop: '-5px'}}>▼</span></span>
                        </button>
                        <ul class="dropdown-menu">
                          <li className='d-flex'><div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('xxs')}>xxs</div> <div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('xs')}>xs</div></li>
                          <li className='d-flex'><div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('s')}>s</div> <div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('m')}>m</div></li>
                          <li className='d-flex'><div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('l')}>l</div> <div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('xl')}>xl</div></li>
                          <li className='d-flex'><div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('xl')}>xl</div> <div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize('3xl')}>3xl</div></li>
                        </ul>
                      </div>

                      <div class="dropdown">
                        <button class="btn dropdown-toggle d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Цвет <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', marginLeft: '12px', marginRight: '12px', backgroundColor: selectedColor}}> <span style={{fontSize: '12px', marginTop: '-5px', marginLeft: '30px'}}>▼</span></div>
                        </button>
                        <ul class="dropdown-menu w-100 color_size">
                          <li className='d-flex'><div class="dropdown-item m-2" style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#0D0D0D'}} onClick={() => setSelectedColor('#0D0D0D')}></div> <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#FFF'}} onClick={() => setSelectedColor('#FFF')} class="dropdown-item m-2"></div></li>
                          <li className='d-flex'><div class="dropdown-item m-2" style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#666'}} onClick={() => setSelectedColor('#666')}></div> <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#0EB5EB'}} onClick={() => setSelectedColor('#0EB5EB')} class="dropdown-item m-2"></div></li>
                          <li className='d-flex'><div class="dropdown-item m-2" style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#D30808'}} onClick={() => setSelectedColor('#D30808')}></div> <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#FAC817'}} onClick={() => setSelectedColor('#FAC817')} class="dropdown-item m-2"></div></li>
                          <li className='d-flex'><div class="dropdown-item m-2" style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#1DB223'}} onClick={() => setSelectedColor('#1DB223')}></div> <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: '#9747FF'}} onClick={() => setSelectedColor('#9747FF')} class="dropdown-item m-2"></div></li>
                        </ul>
                      </div>
                    </div>

                    <hr style={{color: '#CCCCCC'}} />

                    <div className="d-flex justify-content-between">
                      <div className='basket_card_plus_minus' style={{backgroundColor: 'transparent', color: '#000', cursor: 'pointer'}} onClick={() => setCount(count - 1)}>-</div>
                        <input
                          type='number'
                          style={{border: 'none', color: '#000', outline: 'none', width: '40px', textAlign: 'center'}}
                          value={count}
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value, 10);
                            if (!isNaN(newValue)) {
                              setCount(newValue);
                            }
                          }}
                        />
                      <div className='basket_card_plus_minus' style={{backgroundColor: 'transparent', color: '#000', cursor: 'pointer'}} onClick={() => setCount(count + 1)}>+</div>
                    </div>

                    <div style={{marginTop: '50px'}}  className="d-flex">
                      <div onClick={() => handleCardClick(selectedCard.imageSrc, selectedCard.name, selectedCard.price, selectedSize, selectedColor)}>
                        <img style={{cursor: 'pointer', width: '84px', height: '56px'}} src={bag} alt="bag" />
                      </div>

                      <div onClick={() => handleCardClick(selectedCard.imageSrc, selectedCard.name, selectedCard.price, selectedSize, selectedColor)}>
                        <button className='order_now'>Заказать сейчас →</button>
                      </div>
                    </div>
                  </div>

                  <div className='modal_image_fat'>
                    <img src={selectedCard.imageSrc} alt="your_design" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </>
  )
}

export default HomePage