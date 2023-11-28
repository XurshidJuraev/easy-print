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
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function HomePage() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [count, setCount] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSize, setSelectedSize] = useState('s');
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#D9CCC6');
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  function handleCardClick(imageSrc, name, price) {
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

  function handleCardShow(imageSrc, name, price, id) {
    axios.get(`${process.env.REACT_APP_TWO}/product/show/warehouse_product?warehouse_product_id=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }).then((response) => {
      const detailData = response.data.data;
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
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
    
    axios.get(`${process.env.REACT_APP_TWO}/product/show/warehouse_product?warehouse_product_id=${cardData.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }).then((response) => {
      setModalData(response.data.data);
      console.log(response.data.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    if (data.data && data.data.size_by_color && data.data.size_by_color.length > 0) {
      const sizes = data.data.size_by_color.flatMap((size) => size.sizes.map((s) => s.name));
      setSizeOptions(sizes);
      console.log(sizes);
    }
  
    if (data.data && data.data.color_by_size && data.data.color_by_size.length > 0) {
      const colors = data.data.color_by_size.flatMap((color) => color.color.map((c) => c.name));
      setColorOptions(colors);
      console.log(colors);
    }
  }, [data.data]);

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
              <div style={{textDecoration: 'none'}} className="cards">
                <a href={`/show/detail/${data2.id}`} onClick={() => handleCardShow(`${data2.images[0]}`, `${data2.name}`, `${data2.price}`, `${data2.id}`)} className="clothes_fat">
                  <div className="image-container" style={{position: 'relative'}}>
                    <img style={{ borderRadius: '20px', width: '276px', height: '320px' }} src={`${data2.images[0]}`} alt={data2.name} />
                    <div className="image-overlay">
                      <div className="detail_back">
                        <p className="overlay-text">Посмотреть детали</p>
                      </div>
                    </div>
                  </div>
                </a>

                <div className="d-flex mt-3">
                  <div style={{textDecoration: 'none'}}>
                    <p className='t-shirt_name'>{data2.name}</p>
                    <p className='t-shirt_price'>{data2.price} сум</p>
                  </div>

                  <div onClick={() => openModal({id: `${data2.id}`, imageSrc: `${data2.images[0]}`, name: `${data2.name}`, price: `${data2.price}`})} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img style={{cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px'}} src={bag} alt="bag" />
                  </div>
                </div>
              </div>
            </div>
          )): null}

          {data.data ? data.data.warehouse_product_list.slice(3).map((data2) => (
            <div key={data2.id} className='mt-4'>
              <div style={{textDecoration: 'none'}} className="cards">
                <a href={`/show/detail/${data2.id}`} onClick={() => handleCardShow(`${data2.images[0]}`, `${data2.name}`, `${data2.price}`, `${data2.id}`)} className="clothes_fat">
                  <div className="image-container" style={{position: 'relative'}}>
                    <img style={{ borderRadius: '20px', width: '276px', height: '320px' }} src={`${data2.images[0]}`} alt={data2.name} />
                    <div className="image-overlay">
                      <div className="detail_back">
                        <p className="overlay-text">Посмотреть детали</p>
                      </div>
                    </div>
                  </div>
                </a>

                <div className="d-flex">
                  <div>
                    <p className='t-shirt_name'>{data2.name}</p>
                    <p className='t-shirt_price'>{data2.price} сум</p>
                  </div>

                  <div onClick={() => openModal({ imageSrc: `${data2.images[0]}`, name: `${data2.name}`, price: `${data2.price}`, id: `${data2.id}` })} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img style={{ cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px' }} src={bag} alt="bag" />
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
              {modalData && (
                <div className='d-flex'>
                  <div style={{padding: '80px 32px 0px 32px'}}>
                    <p className='modal_name'>{modalData.name ? modalData.name : 'Название отсутствует'}</p>
                    <p className='modal_info'>{modalData.description ? modalData.description : 'Описание отсутствует'}</p>
                    <p className='modal_price'>{modalData.price} сум</p>

                    <div className="d-flex justify-content-between" style={{marginTop: '57px'}}>
                      <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Размер <span style={{textTransform: 'uppercase', marginLeft: '12px'}}>{selectedSize} <span className='ms-1' style={{fontSize: '12px', marginTop: '-5px'}}>▼</span></span>
                        </button>
                        <ul class="dropdown-menu">
                          {sizeOptions.map((size, index) => (
                            <li key={index} className='d-flex'>
                              <div class="dropdown-item" style={{textTransform: 'uppercase'}} onClick={() => setSelectedSize(size)}>{size}</div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div class="dropdown">
                        <button class="btn dropdown-toggle d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Цвет <div style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', marginLeft: '12px', marginRight: '12px', backgroundColor: selectedColor}}> <span style={{fontSize: '12px', marginTop: '-5px', marginLeft: '30px'}}>▼</span></div>
                        </button>
                        <ul class="dropdown-menu w-100 color_size">
                          {colorOptions.map((color, index) => (
                            <li key={index} className='d-flex'>
                              <div class="dropdown-item m-2" style={{width: '23px', height: '23px', borderRadius: '50%', border: '0.5px solid #CCC', backgroundColor: `${color}`}} onClick={() => setSelectedColor(color)}></div> 
                            </li>
                          ))}
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
                      <div onClick={() => handleCardClick(modalData.images ? modalData.images[0] : '', modalData.name, modalData.price)}>
                        <img style={{cursor: 'pointer', width: '84px', height: '56px'}} src={bag} alt="bag" />
                      </div>

                      <div onClick={() => handleCardClick(modalData.images ? modalData.images[0] : '', modalData.name, modalData.price)}>
                        <button className='order_now'>Заказать сейчас →</button>
                      </div>
                    </div>
                  </div>

                  <div className='modal_image_fat'>
                    <img src={modalData.images ? modalData.images[0] : ''} alt="your_design" />
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