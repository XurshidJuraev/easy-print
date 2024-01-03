import React, { useEffect, useLayoutEffect, useState } from 'react'
import HeaderMain from '../../../components/header'
import AdvantageMain from '../../../components/advantage'
import FooterMain from '../../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../main.css';
import ProfileHeader from '../../../components/profile_header';
import no_addres from '../../../layouts/images/no_order.svg';
import image_prder from '../../../layouts/images/original.svg';
import './main.css'
import axios from 'axios';

function ProfileOrders() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/order/get-my-orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }).then((response) => {
      setOrders(response.data);
    }).catch((error) => {
      toast.error('Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  const handleShowOrder = (id) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'en',
        'Accept': 'application/json',
      },
    };
  
    axios.get(`${process.env.REACT_APP_TWO}/order/get-order-detail-by-order-id?id=${id}`, requestOptions)
      .then((response) => {
        setShow(response.data.data);
      })
      .catch((error) => {
        toast.error('Xatolik yuz berdi. Iltimos qaytadan urining!');
      });
  };  

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <ProfileHeader />

          <div className='info_profile'>
            <h3 className='user_name'>Мои заказы</h3>

            {orders.status === true ? (
              <div>
                <div>
                  {orders.data ? orders.data.map((order, index) => (
                    <div key={index} className="order_profile_fat">
                      <h3 className='order_profile_title'>Номер заказа {order.code ? order.code : '12345678'}</h3>

                      <hr style={{ margin: '0' }} />

                      <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center' }}>
                        <div>
                          <p className='order_profile_opacity_text'>Статус:</p>
                          <p className='order_profile_opacity_text'>Дата заказа:</p>
                          <p className='order_profile_opacity_text'>Дата доставки:</p>
                          <p className='order_profile_opacity_text'>Адрес доставки:</p>
                          <p className='order_profile_opacity_text'>Сумма заказа:</p>
                        </div>

                        <div style={{ marginLeft: 'auto' }}>
                          <div className="d-flex">
                            <button className='btn_order_profile' style={{ background: order.status === 'Accepted' ? '#D8E6EA' : order.status === 'On_the_way' ? '#D8E6EA' : order.status === 'Finished' ? '#E6E6E6' : order.status === 'Cancelled' ? '#FFE7D6' : order.status === 'Basked' ? '#FFE7D6' : '#E6E6E6', color: order.status === 'Accepted' ? '#32454B' : order.status === 'On_the_way' ? '#32454B' : order.status === 'Finished' ? '#333333' : order.status === 'Cancelled' ? '#FF4A32' : '#333333' }}>{order.status}</button>
                            <p className='order_profile_opacity_text pt-1 ps-3'>{order.delivery_date ? order.delivery_date : 'Нет данных'}</p>
                          </div>
                          <p className='order_profile_text'>{order.delivery_date ? order.delivery_date : 'Нет данных'}</p>
                          <p className='order_profile_text'>{order.delivery_date ? order.delivery_date : 'Нет данных'}</p>
                          <p className='order_profile_text'>{order.address ? `${order.address.region} ${order.address.city} ${order.address.street}` : 'Нет данных'}</p>
                          <p className='order_profile_text'>{Number(order.all_price).toLocaleString('ru-RU')} сум</p>
                        </div>
                      </div>

                      <hr style={{ margin: '0', marginTop: '-20px' }} />

                      <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button onClick={() => handleShowOrder(order.id)} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${order.id}`} aria-expanded="false" aria-controls={`flush-collapseOne${order.id}`}>
                              {order.product_quantity} товар
                            </button>
                          </h2>
                          <div id={`flush-collapseOne${order.id}`} className={`accordion-collapse collapse ${show.id === order.id ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                              {show && show.map((item, idx) => (
                                <div key={idx}>
                                  <div className='d-flex justify-content-between'>
                                    <div>
                                      <img className='order_img' src={item.warehouse.images && item.warehouse.images[0]} alt={item.warehouse.name} />
                                    </div>
                                    <div>
                                      <p className='order_name'>{item.warehouse.name}</p>
                                      <div className="d-flex">
                                        <div className='d-flex' style={{marginTop: '33px'}}>
                                          <div style={{marginTop: '13px'}}>
                                            <p className='order_name_tite'>Количество:</p>
                                            <p className='order_name_tite'>Размер:</p>
                                          </div>
                                          <div className='text-end center flex-column ms-2' style={{paddingTop: '14px'}}>
                                            <p className='order_name_name'>{item.quantity}</p>
                                            <p className='order_name_name'>{item.warehouse.size && item.warehouse.size.name}</p>
                                          </div>
                                        </div>
                                        <div className='d-flex' style={{marginTop: '66px', marginLeft: '46px'}}>
                                          <div style={{marginTop: '13px'}}>
                                            <p className='order_name_tite'>Цвет:</p>
                                          </div>
                                          <div className='text-end center flex-column ms-2' style={{marginTop: '-6px'}}>
                                            <div style={{backgroundColor: item.warehouse.color && item.warehouse.color.code}} className='order_name_color'></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='d-flex justify-content-space-between flex-column'>
                                      <p className='order_price'>{Number(item.price).toLocaleString('ru-RU')} сум</p>
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <center style={{ marginTop: '56px' }}>
                      <img src={no_addres} alt="no_addres" />
                      <p className='no_address_text'>Вы ещё не оформляли заказ</p>
                    </center>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </>
  );
}

export default ProfileOrders