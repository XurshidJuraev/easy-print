import React, { useEffect, useState } from 'react';
import HeaderMain from '../../components/header';
import AdvantageMain from '../../components/advantage';
import FooterMain from '../../components/footer';
import trash from '../../layouts/icons/delete_product_basket.svg'
import go_to_checkout from '../../layouts/icons/Go_to_checkout.svg'
import return_to_cart from '../../layouts/icons/return_to_cart.svg'
import './main.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [trashCardData, setTrashCardData] = useState([]);
  const [sale, setSale] = useState('');
  const [total, setTotal] = useState('');
  const [delivery, setDelivery] = useState('');
  const [products_total, setProducts_total] = useState('');

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    const ordersString = localStorage.getItem('orders');
    console.log(JSON.parse(ordersString));
    try {
      const parsedOrders = ordersString ? JSON.parse(ordersString) : [];
      setOrders(parsedOrders);
    } catch (error) {
      console.error('Orders ma\'lumotlari noto\'g\'ri formatda');
      console.error(error);
    }
  }, []);
  const pay = JSON.parse(localStorage.getItem('paymentDate'))

  const token = localStorage.getItem('token');
  const order_id = localStorage.getItem('order_id');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TWO}/order/get-order?order_id=${order_id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });
        console.log(response.data.data);
        setSale(response.data.data.coupon_price);
        setTotal(response.data.data.price);
        setDelivery(response.data.data.discount_price);
        setProducts_total(response.data.data.grant_total);
        setOrders(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TWO}/get-address`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });
        console.log(response.data.data);
        setAddress(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <HeaderMain trashCardData={trashCardData} />

      {orders && orders.list && orders.list.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <>
          <div>
            <div className="container">
              <div className='basket_wrapper' style={{ marginTop: '48px' }}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h2 className='order_title'>Оформление заказа</h2>

                    <h3 className='order_subtitle' style={{marginTop: '48px'}}>Покупатель</h3>

                    <input className='order_info' value={localStorage.getItem('user_name') ? localStorage.getItem('user_name') : 'Имя*'}/>
                    <input className='order_info mt-4' value={localStorage.getItem('user_phone_number') ? `+${localStorage.getItem('user_phone_number')}` : 'Действующий номер телефона*'}/>
                    
                    <h3 className='order_subtitle' style={{marginTop: '48px'}}>Адрес доставки</h3>

                    {address && address.length > 0 ? (
                      <div>
                        {address.slice(0, 1).map((addr, index) => (
                          <div className='order_info mt-2' key={index}>
                            {`${addr.region.name}, ${addr.city && addr.city.name ? `${addr.city.name}, ` : ''}${addr.name}, ${addr.postcode}`}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='order_info'>
                        Адрес*
                      </div>
                    )}
                    <center style={{marginTop: '28px'}}>
                      <NavLink className={'addres_btn'} to={'/profile/addres'}>Добавить другой адрес</NavLink>
                    </center>
                    
                    <h3 className='order_subtitle' style={{marginTop: '48px'}}>Выберите карту</h3>

                    <div className='order_info'>{pay?.cardNumber ? (
                      <>
                        <>{pay.cardNumber.slice(0, 4)} </>
                        <>{pay.cardNumber.slice(5, 9).replace(/./g, '*')} </>
                        <>{pay.cardNumber.slice(9, 14).replace(/./g, '*')} </>
                        <>{pay.cardNumber.slice(15, 19)}</>; <span>{pay?.cardName}</span>
                      </>
                    ) : 'Номер карты*'}
                    </div>
                    <center style={{marginTop: '28px'}}>
                      <NavLink className={'addres_btn'} to={'/profile/payment'}>Добавить карту</NavLink>
                    </center>
                  </div>

                  <div className='order_data'>
                    <h2 className='order_title ms-3'>Ваш заказ</h2>
                    <hr />
                    {orders && orders.list && orders.list.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <div className='d-flex justify-content-between'>
                          <div>
                            {item.images && item.images[0] && (
                              <img className='order_img' src={item.images[0]} alt={item.name} />
                            )}
                          </div>
                          <div>
                            <p className='order_name'>{item.name}</p>
                            <div className='d-flex' style={{marginTop: '33px'}}>
                              <div style={{marginTop: '13px'}}>
                                <p className='order_name_tite'>Количество:</p>
                                <p className='order_name_tite'>Размер:</p>
                                <p className='order_name_tite'>Цвет:</p>
                              </div>

                              <div className='text-end center flex-column ms-2'>
                                <p className='order_name_name'>{item.quantity}</p>
                                <p className='order_name_name'>{item.size_name}</p>
                                <div style={{backgroundColor: item.color_code}} className='order_name_color'></div>
                              </div>
                            </div>
                          </div>
                          <div className='d-flex justify-content-space-between flex-column'>
                            <p className='order_price'>{item.price} сум</p>

                            <img style={{marginTop: '130px'}} src={trash} alt="trash" />
                          </div>
                        </div>

                        <hr />
                      </div>
                    ))}

                    <div className="basket_total" style={{width: '100%'}}>
                      <div>
                        <p className='basket_total_title' style={{marginBottom: '28px'}}>Итог товаров</p>
                        <p className='basket_total_title' style={{marginBottom: '28px'}}>Промокоды</p>
                        <p className='basket_total_title' style={{marginBottom: '28px'}}>Скидки</p>
                        <p className='basket_total_title'>Итого</p>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <p className='basket_total_price' style={{marginBottom: '28px'}}>{Number(products_total).toLocaleString('ru-RU')} сум</p>
                        <p className='basket_total_price' style={{marginBottom: '28px'}}>{Number(delivery).toLocaleString('ru-RU')} сум</p>
                        <p className='basket_total_price' style={{marginBottom: '28px'}}>{Number(sale).toLocaleString('ru-RU')} сум</p>
                        <p className='basket_total_price'>{Number(total).toLocaleString('ru-RU')} сум</p>
                      </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'end', marginTop: '24px'}}>
                      <img src={go_to_checkout} alt="go_to_checkout" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="container">
        <NavLink to={'/'}>
          <img style={{marginTop: '40px'}} src={return_to_cart} alt="return_to_cart" />
        </NavLink>
      </div>

      <AdvantageMain />
      <FooterMain />
    </div>
  );
}

export default MyOrders;