import React, { useEffect, useState } from 'react'
import HeaderMain from '../../components/header'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import addToBasketImg from '../../layouts/icons/basket2.svg'
import order from '../../layouts/icons/order.svg'
import './main.css'
import 'react-toastify/dist/ReactToastify.css';
import CardFour from '../../layouts/always'

function ShowDetail() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  const data = JSON.parse(localStorage.getItem('showDetail'));

  const addToBasket = (productData) => {
    console.log('Adding to basket:', productData);
  };

  useEffect(() => {
    addToBasket(selectedProduct);
  }, [selectedProduct]);

  return (
    <div>
      <HeaderMain trashCardData={trashCardData} />

      <div className="container">
        <h3 className='show_detail_title mb-3'>Детали товара</h3>

        <div className="card_detail">
          <div className="img_card_detail">
            <img src={data.imageSrc} alt={data.name} />
          </div>

          <div style={{marginLeft: '48px'}}>
            <h2 className='show_detail_name'>{data.name}</h2>

            <p className='show_detail_description'>Мужская футболка с круглым вырезом и с принтом Kiikii</p>

            <p className='show_detail_price'>{data.price} сум</p>

            <div className="d-flex">
              <div style={{marginRight: '83px'}}>
                <p className='show_detail_size'>Размер</p>
                <select className='show_detail_option'>
                  <option value="xl">xl</option>
                </select>
              </div>

              <div>
                <p className='show_detail_size'>Цвет</p>

                <div className="d-flex">
                  <div className="color_border" style={{marginRight: '16px'}}>
                    <div className="color"></div>
                  </div>

                  <div className="color_border" style={{marginRight: '16px', borderColor: '#E6E6E6'}}>
                    <div className="color" style={{backgroundColor: '#49B854'}}></div>
                  </div>

                  <div className="color_border" style={{marginRight: '16px', borderColor: '#E6E6E6'}}>
                    <div className="color" style={{backgroundColor: '#333333'}}></div>
                  </div>

                  <div className="color_border" style={{borderColor: '#E6E6E6'}}>
                    <div className="color" style={{backgroundColor: '#7CBCF8'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <img style={{marginTop: '18px', marginRight: '12px'}} src={addToBasketImg} alt="addToBasket" />
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

        <CardFour addToBasket={addToBasket} />

        <div className='mt-5'>
          <CardFour addToBasket={addToBasket} />
        </div>

        <center className='mt-5'>
          <button className='show_detail_button'>Показать еще</button>
        </center>
      </div>

      <AdvantageMain />
      <FooterMain />
    </div>
  );
}

export default ShowDetail;