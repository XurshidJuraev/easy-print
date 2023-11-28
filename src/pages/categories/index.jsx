import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
      console.log(response.data);
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
            {category.products.map(productList => (
              productList.map(data2 => (
                <div key={data2.id}>
                  <a style={{textDecoration: 'none'}} className="cards">
                    <a href={`/show/detail/${data2.id}`} className="clothes_fat">
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
      
                      <div onClick={() => openModal({imageSrc: `${data2.images[0]}`, name: `${data2.name}`, price: `${data2.price}`})} data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img style={{cursor: 'pointer', width: '52px', height: '36px', marginLeft: '11px', marginTop: '10px'}} src={bag} alt="bag" />
                      </div>
                    </div>
                  </a>
                </div>
              ))
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