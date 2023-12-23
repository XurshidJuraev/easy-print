import React, { useEffect, useLayoutEffect, useState } from 'react'
import HeaderMain from '../../components/header'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import show_right from '../../layouts/icons/show_right.svg'
import show_left from '../../layouts/icons/show_left.svg'
import './main.css'
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function ShowDetail() {
  const params = useParams()
  const [trashCardData, setTrashCardData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dataBeck, setDataBeck] = useState([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const token = localStorage.getItem('token');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [data, setData] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState(8);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  useEffect(() => {
    if (dataBeck.size_by_color && dataBeck.size_by_color.length > 0) {
      const sizes = dataBeck.size_by_color.flatMap((size) => size.sizes.map((s) => s.name));
      setSizeOptions(sizes);
    }

    if (dataBeck.color_by_size && dataBeck.color_by_size.length > 0) {
      const colors = dataBeck.color_by_size.flatMap((color) => color.color.map((c) => c.name));
      setColorOptions(colors);
    }
  }, [dataBeck]);

  const handleNextImage = () => {
    if (dataBeck.images && dataBeck.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dataBeck.images.length);
    }
  };

  const handlePrevImage = () => {
    if (dataBeck.images && dataBeck.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + dataBeck.images.length) % dataBeck.images.length);
    }
  };

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    addToBasket(selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/product/show/warehouse_product?warehouse_product_id=${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }).then((response) => {
      setDataBeck(response.data.data);
    }).catch((error) => {
      console.log(error);
    });    
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

  const handleShowMore = () => {
    if (data.data && data.data.warehouse_product_list.length > displayedItems) {
      setDisplayedItems((prevDisplayedItems) => prevDisplayedItems + 8);
    }
  };

  const addToBasket = (productData) => {
    if (productData) {
      const selectedColor = dataBeck.color_by_size[selectedSizeIndex];
      const selectedSize = dataBeck.size_by_color[selectedColorIndex];
  
      const colorId = selectedColor.color[0].id;
      const sizeId = selectedSize.sizes[0].id;
  
      var myHeaders = new Headers();
      myHeaders.append("language", "uz");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      var formdata = new FormData();
      formdata.append("warehouse_product_id", productData.id);
      formdata.append("quantity", 1);
      formdata.append("color_id", colorId);
      formdata.append("size_id", sizeId);
      formdata.append("price", productData.price);
      formdata.append("discount", dataBeck.discount ? dataBeck.discount : '0');
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const basketData = {
        warehouse_product_id: productData.id,
        quantity: 1,
        color_id: colorId,
        size_id: sizeId,
        price: productData.price,
        discount: dataBeck.discount ? dataBeck.discount : '0'
      };

      localStorage.setItem('basket', JSON.stringify(basketData));
  
      fetch("http://admin.easyprint.uz/api/order/set-warehouse", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === true) {
            toast.success('Товар добавлен');
          } else {
            if (result.message === "Unauthenticated.") {
              // Unauthenticated xabari kelganda local storage'ga ma'lumot saqlang
              const basketData = {
                warehouse_product_id: productData.id,
                quantity: 1,
                color_id: colorId,
                size_id: sizeId,
                price: productData.price,
                discount: dataBeck.discount ? dataBeck.discount : '0'
              };
  
              localStorage.setItem('basket', JSON.stringify(basketData));
  
              toast.error('Вы еще не зарегистрированы. Товар добавлен в корзину.');
            } else {
              toast.error('Товар не добавлен');
            }
          }
        })
        .catch(error => {
          console.log('error', JSON.parse(error));
          toast.error('Товар не добавлен');
        });
    }
  };
  
  useEffect(() => {
    addToBasket(selectedProduct);
  }, [selectedProduct]);  

  return (
    <div>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

      <div className="container">
        <h3 className='show_detail_title mb-3'>Детали товара</h3>

        <div className="card_detail">
          <div className="img_card_detail">
            {dataBeck.images && dataBeck.images.length > 0 && (
              <img src={dataBeck.images[currentImageIndex]} alt={dataBeck.name ? dataBeck.name : 'Название отсутствует или не найден'} />
            )}

            <div className="d-flex justify-content-between" style={{width: '439.014px', marginLeft: '-50px', marginTop: '450px'}}>
              <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleNextImage}>
                <img style={{ width: '48px', height: '48px' }} src={show_right} alt="show_right" />
              </button>

              <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handlePrevImage}>
                <img style={{ width: '48px', height: '48px' }} src={show_left} alt="show_left" />
              </button>
            </div>
          </div>

          <div style={{marginLeft: '48px'}}>
            <h2 className='show_detail_name'>{dataBeck.name ? dataBeck.name : 'Название отсутствует или не найден'}</h2>

            <p className='show_detail_description'>{dataBeck.description ? dataBeck.description : 'Описание отсутствует или не найден'}</p>

            <p className='show_detail_price'>
              {dataBeck.price_discount ? 
                <div>
                  {Number(dataBeck.price_discount).toLocaleString('ru-RU')} сум
                  <del className='show_detail_price_discount'>
                    {Number(dataBeck.price).toLocaleString('ru-RU')} сум
                  </del>
                </div>
                : 
                <div>
                  {dataBeck.price ? `${Number(dataBeck.price).toLocaleString('ru-RU')} сум` : 'Цена отсутствует или не найден'}
                </div>
              }
            </p>

            <div className="d-flex">
              <div style={{marginRight: '83px'}}>
                <p className='show_detail_size'>Размер</p>
                <select className='show_detail_option' value={sizeOptions[selectedSizeIndex]} onChange={(e) => {const index = sizeOptions.findIndex((size) => size === e.target.value);setSelectedSizeIndex(index);}}>
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <p className='show_detail_size'>Цвет</p>

                <div className="d-flex">
                  {colorOptions.map((color, index) => (
                    <div
                      key={index}
                      className="color_border me-2"
                      style={{borderColor: selectedColorIndex === index ? '#4D4D4D' : '#E6E6E6', cursor: 'pointer'}}
                      onClick={() => setSelectedColorIndex(index)}
                    >
                      <div className="color" style={{backgroundColor: color}}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="d-flex">
              <button onClick={() => addToBasket(dataBeck)} className='add_basket_btn' style={{width: '266px', height: '56px', marginTop: '18px', marginLeft: '0px', padding: '15px 18px', marginRight: '12px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19.5 7H17C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7H4.5C3.83696 7 3.20107 7.26339 2.73223 7.73223C2.26339 8.20107 2 8.83696 2 9.5L2 17.8333C2.00132 18.938 2.44073 19.997 3.22185 20.7782C4.00296 21.5593 5.062 21.9987 6.16667 22H17.8333C18.938 21.9987 19.997 21.5593 20.7782 20.7782C21.5593 19.997 21.9987 18.938 22 17.8333V9.5C22 8.83696 21.7366 8.20107 21.2678 7.73223C20.7989 7.26339 20.163 7 19.5 7ZM12 3.66667C12.8841 3.66667 13.7319 4.01786 14.357 4.64298C14.9821 5.2681 15.3333 6.11594 15.3333 7H8.66667C8.66667 6.11594 9.01786 5.2681 9.64298 4.64298C10.2681 4.01786 11.1159 3.66667 12 3.66667ZM20.3333 17.8333C20.3333 18.4964 20.0699 19.1323 19.6011 19.6011C19.1323 20.0699 18.4964 20.3333 17.8333 20.3333H6.16667C5.50363 20.3333 4.86774 20.0699 4.3989 19.6011C3.93006 19.1323 3.66667 18.4964 3.66667 17.8333V9.5C3.66667 9.27899 3.75446 9.06702 3.91074 8.91074C4.06702 8.75446 4.27899 8.66667 4.5 8.66667H7V10.3333C7 10.5543 7.0878 10.7663 7.24408 10.9226C7.40036 11.0789 7.61232 11.1667 7.83333 11.1667C8.05435 11.1667 8.26631 11.0789 8.42259 10.9226C8.57887 10.7663 8.66667 10.5543 8.66667 10.3333V8.66667H15.3333V10.3333C15.3333 10.5543 15.4211 10.7663 15.5774 10.9226C15.7337 11.0789 15.9457 11.1667 16.1667 11.1667C16.3877 11.1667 16.5996 11.0789 16.7559 10.9226C16.9122 10.7663 17 10.5543 17 10.3333V8.66667H19.5C19.721 8.66667 19.933 8.75446 20.0893 8.91074C20.2455 9.06702 20.3333 9.27899 20.3333 9.5V17.8333Z" fill="white"/>
                </svg>
                <span>Добавить в корзину</span>
              </button>

              <button className='hero_button' style={{width: '236px', height: '56px', marginTop: '18px', marginLeft: '0px', padding: '15px 18px'}}>
                <span>Заказать сейчас</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path d="M22.5 13.0039C22.4951 12.4774 22.2832 11.9741 21.91 11.6029L17.62 7.29979C17.4326 7.11341 17.1792 7.00879 16.915 7.00879C16.6508 7.00879 16.3974 7.11341 16.21 7.29979C16.1163 7.39282 16.0419 7.5035 15.9911 7.62545C15.9403 7.7474 15.9142 7.8782 15.9142 8.0103C15.9142 8.14241 15.9403 8.27321 15.9911 8.39516C16.0419 8.5171 16.1163 8.62778 16.21 8.72081L19.5 12.0032H3.5C3.23478 12.0032 2.98043 12.1086 2.79289 12.2963C2.60536 12.484 2.5 12.7385 2.5 13.0039C2.5 13.2693 2.60536 13.5238 2.79289 13.7115C2.98043 13.8992 3.23478 14.0046 3.5 14.0046H19.5L16.21 17.297C16.0217 17.4841 15.9154 17.7384 15.9144 18.004C15.9135 18.2695 16.018 18.5246 16.205 18.713C16.392 18.9015 16.6461 19.0078 16.9115 19.0088C17.1768 19.0097 17.4317 18.9051 17.62 18.718L21.91 14.4149C22.2856 14.0413 22.4978 13.5339 22.5 13.0039Z" fill="white"/>
                </svg>
              </button>
            </div>

            <div style={{display: 'flex', marginTop: '32px'}}>
              <p className='show_detail_author'>Автор:</p>
              <a className='show_detail_author_name' href="#">EasyPrint</a>
            </div>

            <div>
              <h3 className='show_detail_title_info mb-3'>Детали</h3>

              <div className="d-flex">
                <div>
                  <p className='show_detail_title_info-text'>Материал:</p>
                  <p className='show_detail_title_info-text'>Состав материала:</p>
                  <p className='show_detail_title_info-text'>Страна-производитель:</p>
                </div>

                <div style={{marginLeft: '32px'}}>
                  <p className='show_detail_title_info-text' style={{color: '#1A1A1A'}}>Хлопо</p>
                  <p className='show_detail_title_info-text' style={{color: '#1A1A1A'}}>70% хлопок, 30% полиэстер</p>
                  <p className='show_detail_title_info-text' style={{color: '#1A1A1A'}}>Узбекистан</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h3 className='show_detail_title mb-4'>Похожие товары</h3>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
          {data.data ? data.data.warehouse_product_list.slice(0, displayedItems).map((data2) => (
            <div key={data2.id}>
              <div style={{textDecoration: 'none'}} className="cards">
                <NavLink to={`/show/detail/${data2.id}`} className="clothes_fat">
                  <div className="image-container" style={{position: 'relative', zIndex: '200'}}>
                    <div>
                      <div style={{position: 'absolute', top: '0', right: '0', zIndex: '1', display: data2.discount ? 'block' : 'none'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="44" viewBox="0 0 80 44" fill="none">
                          <circle cx="75" cy="-31" r="74.5" fill="#FEF4EE" stroke="#F9D5BB"/>
                        </svg>
                        <div>
                          <p className='discount'>-{data2.discount}%</p>
                        </div>
                      </div>
                      <img style={{ borderRadius: '20px', width: '276px', height: '320px' }} src={`${data2.images[0]}`} alt={data2.name} />
                    </div>

                    <div className="image-overlay">
                      <div className="detail_back">
                        <p className="overlay-text">Посмотреть детали</p>
                      </div>
                    </div>
                  </div>
                </NavLink>

                <div className="d-flex mt-3">
                  <div style={{textDecoration: 'none'}}>
                    <p className='t-shirt_name'>{data2.name}</p>
                    <p className='t-shirt_price'>
                      {data2.price_discount ? 
                        <span>
                          <span className='discount_price'>{Number(data2.price_discount).toLocaleString('ru-RU')} сум</span> 
                          <del className='discount_price_del'>{Number(data2.price).toLocaleString('ru-RU')} сум</del> 
                        </span>
                        : 
                        <div>
                          {Number(data2.price).toLocaleString('ru-RU')} сум
                        </div>
                      }
                    </p>
                  </div>

                  <div onClick={() => openModal({imageSrc: `${data2.images[0]}`, name: `${data2.name}`, price: `${data2.price}`})} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    {/* <img style={{cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px'}} src={bag} alt="bag" /> */}
                    <button className='add_to_basket'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_2381_4754)">
                          <path d="M17.5 5H15C15 3.67392 14.4732 2.40215 13.5355 1.46447C12.5979 0.526784 11.3261 0 10 0C8.67392 0 7.40215 0.526784 6.46447 1.46447C5.52678 2.40215 5 3.67392 5 5H2.5C1.83696 5 1.20107 5.26339 0.732233 5.73223C0.263392 6.20107 0 6.83696 0 7.5L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V7.5C20 6.83696 19.7366 6.20107 19.2678 5.73223C18.7989 5.26339 18.163 5 17.5 5ZM10 1.66667C10.8841 1.66667 11.7319 2.01786 12.357 2.64298C12.9821 3.2681 13.3333 4.11594 13.3333 5H6.66667C6.66667 4.11594 7.01786 3.2681 7.64298 2.64298C8.2681 2.01786 9.11594 1.66667 10 1.66667ZM18.3333 15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V7.5C1.66667 7.27899 1.75446 7.06702 1.91074 6.91074C2.06702 6.75446 2.27899 6.66667 2.5 6.66667H5V8.33333C5 8.55435 5.0878 8.76631 5.24408 8.92259C5.40036 9.07887 5.61232 9.16667 5.83333 9.16667C6.05435 9.16667 6.26631 9.07887 6.42259 8.92259C6.57887 8.76631 6.66667 8.55435 6.66667 8.33333V6.66667H13.3333V8.33333C13.3333 8.55435 13.4211 8.76631 13.5774 8.92259C13.7337 9.07887 13.9457 9.16667 14.1667 9.16667C14.3877 9.16667 14.5996 9.07887 14.7559 8.92259C14.9122 8.76631 15 8.55435 15 8.33333V6.66667H17.5C17.721 6.66667 17.933 6.75446 18.0893 6.91074C18.2455 7.06702 18.3333 7.27899 18.3333 7.5V15.8333Z" fill="white"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_2381_4754">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>

                      <svg style={{marginLeft: '-8px', marginRight: '2px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.3333 8.33334H8.66666V3.66666C8.66666 3.29847 8.36819 3 8 3C7.63181 3 7.33334 3.29847 7.33334 3.66666V8.33331H2.66666C2.29847 8.33334 2 8.63181 2 9C2 9.36819 2.29847 9.66666 2.66666 9.66666H7.33331V14.3333C7.33331 14.7015 7.63178 15 7.99997 15C8.36816 15 8.66662 14.7015 8.66662 14.3333V9.66666H13.3333C13.7015 9.66666 13.9999 9.36819 13.9999 9C14 8.63181 13.7015 8.33334 13.3333 8.33334Z" fill="white"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )): null}
        </div>

        {data.data && data.data.warehouse_product_list.length > displayedItems && (
          <center className='mt-5'>
            <button className='show_detail_button' onClick={handleShowMore}>Показать еще</button>
          </center>
        )}
      </div>

      <AdvantageMain />
      <FooterMain />
    </div>
  );
}

export default ShowDetail;