import React, { useEffect, useState } from 'react'
import HeaderMain from '../../components/header'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import addToBasketImg from '../../layouts/icons/basket2.svg'
import show_right from '../../layouts/icons/show_right.svg'
import show_left from '../../layouts/icons/show_left.svg'
import order from '../../layouts/icons/order.svg'
import bag from '../../layouts/icons/active_bag_icon.svg'
import './main.css'
import 'react-toastify/dist/ReactToastify.css';
import CardFour from '../../layouts/always'
import { useParams } from 'react-router-dom'
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
  const [sizeIdOptions, setSizeIdOptions] = useState([]);
  const [data, setData] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [colorIdOptions, setColorIdOptions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState(8);

  useEffect(() => {
    if (dataBeck.size_by_color && dataBeck.size_by_color.length > 0) {
      const sizes = dataBeck.size_by_color.flatMap((size) => size.sizes.map((s) => s.name));
      // const sizeID = dataBeck.size_by_color.flatMap((size) => size.sizes.map((s) => s.id));
      setSizeOptions(sizes);
      // setSizeIdOptions(sizeID);
    }

    if (dataBeck.color_by_size && dataBeck.color_by_size.length > 0) {
      const colors = dataBeck.color_by_size.flatMap((color) => color.color.map((c) => c.name));
      // const colorsID = dataBeck.color_by_size.flatMap((color) => color.color.map((c) => c.id));
      setColorOptions(colors);
      // setColorIdOptions(colorsID);
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

  const getColorId = (selectedColor) => {
    const colorIndex = colorOptions.findIndex((color) => color === selectedColor);
    return colorIdOptions[colorIndex];
  };
  
  const getSizeId = (selectedSize) => {
    const sizeIndex = sizeOptions.findIndex((size) => size === selectedSize);
    return sizeIdOptions[sizeIndex];
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

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://admin.easyprint.uz/api/order/set-warehouse", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status === true) {
            console.log(result); 
            toast.success('Товар добавлен');
          } else {
            console.log(result);
            toast.error('Товар не добавлен');
          }}
        )
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

            <img style={{marginTop: '18px', marginRight: '12px'}} onClick={() => addToBasket(dataBeck)} src={addToBasketImg} alt="addToBasket" />
            <img style={{marginTop: '18px'}} src={order} alt="order" />

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
                <a href={`/show/detail/${data2.id}`} className="clothes_fat">
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
                </a>

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
                    <img style={{cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px'}} src={bag} alt="bag" />
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