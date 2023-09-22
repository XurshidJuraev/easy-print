import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import design1 from '../../layouts/images/boxing.svg'
import design2 from '../../layouts/images/kiikii.svg'
import design3 from '../../layouts/images/original.svg'
import design4 from '../../layouts/images/underland.svg'
import bag from '../../layouts/icons/active_bag_icon.svg'

function CardFour({ addToBasket }) {
  const [trashCardData, setTrashCardData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [count, setCount] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSize, setSelectedSize] = useState('s');
  const [selectedColor, setSelectedColor] = useState('#D9CCC6');

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

    addToBasket({ imageSrc, name, price, selectedSize, selectedColor });
  
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

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
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
      <ToastContainer />
      
      <section className='container' style={{marginTop: '-50px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
          <div className="cards mt-5" onClick={() => openModal({imageSrc: design2, name: 'Мужская футболка Kiikii', price: '120 000'})} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="clothes_fat">
              <div className="image-container" style={{position: 'relative'}}>
                <img style={{borderRadius: '20px'}} src={design2} alt="your_design" />
                <div className="image-overlay">
                  <div className="detail_back">
                    <p className="overlay-text">Посмотреть детали</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div>
                <p className='t-shirt_name'>Мужская футболка Kiikii</p>
                <p className='t-shirt_price'>120 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Мужская футболка Kiikii', '120 000')}>
                <img style={{cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px'}} src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-5" onClick={() => openModal({imageSrc: design4, name: 'Мужская футболка UNDRGRAUND', price: '120 000'})} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="clothes_fat">
              <div className="image-container" style={{position: 'relative'}}>
                <img style={{borderRadius: '20px'}} src={design4} alt="your_design" />
                <div className="image-overlay">
                  <div className="detail_back">
                    <p className="overlay-text">Посмотреть детали</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div>
                <p className='t-shirt_name'>Мужская футболка UNDRGRAUND</p>
                <p className='t-shirt_price'>120 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Мужская футболка UNDRGRAUND', '120 000')}>
                <img style={{cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px'}} src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-5" onClick={() => openModal({imageSrc: design1, name: 'Мужская футболка Boxing', price: '120 000'})} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="clothes_fat">
              <div className="image-container" style={{position: 'relative'}}>
                <img style={{borderRadius: '20px'}} src={design1} alt="your_design" />
                <div className="image-overlay">
                  <div className="detail_back">
                    <p className="overlay-text">Посмотреть детали</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div>
                <p className='t-shirt_name'>Мужская футболка Boxing</p>
                <p className='t-shirt_price'>120 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Мужская футболка Boxing', '120 000')}>
                <img style={{cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px'}} src={bag} alt="bag" />
              </div>
            </div>
          </div>

          <div className="cards mt-5" onClick={() => openModal({imageSrc: design3, name: 'Мужская футболка Kiikii', price: '120 000'})} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="clothes_fat">
              <div className="image-container" style={{position: 'relative'}}>
                <img style={{borderRadius: '20px'}} src={design3} alt="your_design" />
                <div className="image-overlay">
                  <div className="detail_back">
                    <p className="overlay-text">Посмотреть детали</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div>
                <p className='t-shirt_name'>Мужская футболка Kiikii</p>
                <p className='t-shirt_price'>120 000 сум</p>
              </div>

              <div onClick={() => handleCardClick(design2, 'Мужская футболка Kiikii', '120 000')}>
                <img style={{cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px'}} src={bag} alt="bag" />
              </div>
            </div>
          </div>
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
    </>
  )
}

export default CardFour