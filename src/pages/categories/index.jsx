import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import HeaderMain from '../../components/header'
import AdvantageMain from '../../components/advantage';
import FooterMain from '../../components/footer';
import bag from '../../layouts/icons/active_bag_icon.svg'
import axios from 'axios';

function CategoryListByName() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const token = localStorage.getItem('token');
  const params = useParams()

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-products-by-category?category_id=${params.id}`, {
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
    <div>
      <HeaderMain trashCardData={trashCardData} />

      <div className='container mt-5'>
        {data.data ? data.data.map(category => (
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}} key={category.category.id}>
            {category.products.map(data2 => (
              <div key={data2.id}>
                <a style={{textDecoration: 'none'}} className="cards">
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
                            <span className='discount_price'>{data2.price_discount} сум</span> 
                            <del className='discount_price_del'>{data2.price} сум</del> 
                          </span>
                          : 
                          <div>
                            {data2.price} сум
                          </div>
                        }
                      </p>
                    </div>
    
                    <div onClick={() => openModal({imageSrc: `${data2.images[0]}`, name: `${data2.name}`, price: `${data2.price}`})} data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                </a>
              </div>
            ))}
          </div>
        )) : null}
      </div>
      
      <AdvantageMain />
      <FooterMain />
    </div>
  )
}

export default CategoryListByName