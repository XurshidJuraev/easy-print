import React, { useEffect, useState } from 'react'
import HeaderMainMobile from '../../../components/header'
import FooterMainMobile from '../../../components/footer'
import FooterBarMobile from '../../../components/footer bar'
import ProfileHeader from '../../../components/profile header'
import no_addres from '../../../layouts/images/no_order.svg';
import './main.css'
import { toast } from 'react-toastify'
import axios from 'axios'

function ProfileMobileOrder() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const handleClickCategoryChange = () => {
    setCollapse((prev) => !prev);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/order/get-my-orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setOrders(response.data);
    }).catch((error) => {
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  const handleShowOrder = (id) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
        'Accept': 'application/json',
      },
    };
  
    axios.get(`${process.env.REACT_APP_TWO}/order/get-order-detail-by-order-id?id=${id}`, requestOptions)
      .then((response) => {
        setShow(response.data.data);
      })
      .catch((error) => {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      });
  };  

  return (
    <div>
      <HeaderMainMobile />
      <center style={{marginTop: '80px'}}>
        <div className='profile_page' style={{padding: '0'}}>
          <div style={{padding: '16px'}}>
            <ProfileHeader />
          </div>

          <center>
            <div style={{textAlign: 'left'}}>
              <h3 className='profile_page_title' style={{paddingLeft: '16px'}}>Мои заказы</h3>

              {orders.status === true ? (
                <center style={{textAlign: 'left', padding: '2px'}}>
                  <div>
                    {orders.data ? orders.data.map((order, index) => (
                      <div key={index} style={{width: '99%', position: 'relative', left: '2px', boxShadow: 'inset 0px 0px 0px 0.5px #999'}} className="order_profile_fat">
                        <h3 style={{padding: '12px'}} className='order_profile_title'>ID заказа {order.code ? order.code : '12345678'}</h3>

                        <hr style={{ margin: '0', marginRight: '12px', marginLeft: '12px' }} />

                        <div style={{ padding: '12px', display: 'flex', alignItems: 'center' }}>
                          <div style={{width: '100%'}}>
                            <div style={{width: '100%'}} className="d-flex justify-content-between">
                              <p className='order_profile_opacity_text'>Статус:</p>
                              <button className='btn_order_profile' style={{ background: order.status === 'Ordered' ? '#D8E5FE' : order.status === 'Performed' ? '#D8E5FE' : order.status === 'Canceled' ? '#FFE7D6' : order.status === 'Accepted_by_recipient' ? '#E6E6E6' : '#D8E5FE', color: order.status === 'Ordered' ? '#3064CC' : order.status === 'Performed' ? '#3064CC' : order.status === 'Canceled' ? '#FF4A32' : order.status === 'Accepted_by_recipient' ? '#333' : '#3064CC', marginTop: '-5px' }}>{order.status}</button>
                            </div>

                            <div className="d-flex flex-column">
                              <p style={{marginBottom: '4px'}} className='order_profile_opacity_text'>Дата заказа:</p>
                              <p className='order_profile_text'>{order.order_date ? order.order_date : 'Нет данных'}</p>
                            </div>

                            <div className="d-flex flex-column">
                              <p style={{marginBottom: '4px'}} className='order_profile_opacity_text'>Дата доставки:</p>
                              <p className='order_profile_text'>{order.delivery_date ? order.delivery_date : 'Я еще не получила заказ :('}</p>
                            </div>

                            <div className="d-flex flex-column">
                              <p style={{marginBottom: '4px'}} className='order_profile_opacity_text'>Адрес доставки:</p>
                              <p className='order_profile_text'>{order.address ? `${order.address.region === null ? 'Пока нет данных :(' : order.address.region} ${order.address.city === null ? '' : order.address.city} ${order.address.street === null ? '' : order.address.street} ${order.address.house === null ? '' : order.address.house === undefined ? '' : order.address.house}` : 'Нет данных'}</p>
                            </div>

                            <div className="d-flex flex-column">
                              <p style={{marginBottom: '4px'}} className='order_profile_opacity_text'>Сумма заказа:</p>
                              <p className='order_profile_text'>{Number(order.all_price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>
                            </div>
                          </div>
                        </div>

                        <hr style={{ margin: '0', marginTop: '-20px', marginRight: '12px', marginLeft: '12px', position: 'relative', zIndex: '200' }} />
                        <div style={{width: '99.5%', position: 'relative', zIndex: '100', height: '2px', backgroundColor: 'rgb(255, 255, 255)', top: '1px', left: '1px'}}></div>

                        <div style={{backgroundColor: '#ffffff', boxShadow: 'inset 0px 0px 0px 0.5px #999'}} className="accordion accordion-flush" id="accordionFlushExample">
                          <div className="accordion-item accordion_color">
                            <h2 style={{border: 'none'}} className="accordion-header accordion_color">
                              <button style={{border: 'none', fontSize: '16px', padding: '12px'}} onClick={() => {handleShowOrder(order.id); handleClickCategoryChange()}} className="accordion-button accordion_color collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${order.id}`} aria-expanded="false" aria-controls={`flush-collapseOne${order.id}`}>
                                {collapse ? 'Свернуть' : `${order.product_quantity} товар`}
                              </button>
                            </h2>
                            <div id={`flush-collapseOne${order.id}`} className={`accordion-collapse collapse ${show.id === order.id ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
                              <div className="accordion-body">
                                {show && show.map((item, idx) => (
                                  <div key={idx} style={{marginBottom: '12px'}}>
                                    <div className='d-flex'>
                                      <div>
                                        <div style={{width: '130px', height: '180px', backgroundColor: '#F6F6F6', backgroundImage: `url(${item.warehouse && item.warehouse.images && item.warehouse.images[0] ? item.warehouse.images[0] : item.image_front})`, borderRadius: '8px', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}></div>
                                      </div>

                                      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '12px'}}>
                                        <p className='order_name_mobile'>{item.warehouse && item.warehouse.name ? item.warehouse.name : item.product.name}</p>
                                        <div className="d-flex">
                                          <div className='d-flex'>
                                            <div>
                                              <p className='order_name_tite'>Количество: <span className='order_name_name ms-1' style={{fontFamily: 'Inter500', color: '#1A1A1A', fontSize: '13px'}}>{item.quantity}</span></p>
                                              <p className='order_name_tite'>Размер: <span className='order_name_name ms-1' style={{color: '#1A1A1A', fontSize: '13px'}}>{item.warehouse && item.warehouse.size && item.warehouse.size.name ? item.warehouse.size.name : item.size.name}</span></p>
                                              <p className='order_name_tite d-flex'>Цвет: <div style={{ backgroundColor: item.warehouse && item.warehouse.color && item.warehouse.color.code ? item.warehouse.color.code : item.color.code, width: '16px', height: '16px' }} className='order_name_color ms-1'></div></p>
                                            </div>
                                          </div>
                                        </div>
                                        <p style={{color: '#3064CC', marginBottom: '0', position: 'relative', top: '-23px'}} className='order_price mt-3'>{Number(item.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <center style={{ marginTop: '56px' }}>
                        <img style={{marginTop: '42px'}} src={no_addres} alt="no_addres" />
                        <p style={{marginBottom: '72px'}} className='no_address_text'>Вы ещё не оформляли заказ</p>
                      </center>
                    )}
                  </div>
                </center>
              ) : null}
            </div>
          </center>
        </div>
      </center>
      
      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default ProfileMobileOrder