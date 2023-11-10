import React, { useEffect, useState } from 'react';
import HeaderMain from '../../components/header';
import AdvantageMain from '../../components/advantage';
import FooterMain from '../../components/footer';
import trash from '../../layouts/icons/delete_product_basket.svg'
import go_to_checkout from '../../layouts/icons/Go_to_checkout.svg'
import return_to_cart from '../../layouts/icons/return_to_cart.svg'
import './main.css';
import { NavLink } from 'react-router-dom';

function MyOrders() {
  const [orders, setOrders] = useState([]);
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

  const address = JSON.parse(localStorage.getItem('userLocation'))
  const pay = JSON.parse(localStorage.getItem('paymentDate'))

  useEffect(() => {
    orders.forEach((order) => {
      setDelivery(order.deliveryCharge);
      setProducts_total(order.productsTotal);
      setTotal(order.total);
      setSale(order.promoCodeAmount);
    });
  }, [orders]);

  return (
    <div>
      <HeaderMain trashCardData={trashCardData} />

      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <>
          {orders.map((order, index) => (
            <div key={index}>
              <div className="container">
                <div className='basket_wrapper' style={{ marginTop: '48px' }}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h2 className='order_title'>Оформление заказа</h2>

                      <h3 className='order_subtitle' style={{marginTop: '48px'}}>Покупатель</h3>

                      <div className='order_info'>{order.userName ? order.userName : 'Имя и Фамилия*'}</div>
                      <div className='order_info mt-4'>{order.phoneNumber ? order.phoneNumber : 'Действующий номер телефона*'}</div>
                      
                      <h3 className='order_subtitle' style={{marginTop: '48px'}}>Адрес доставки</h3>

                      <div className='order_info'>{address.region ? `${address.region}, ${address.city}, ${address.street}, ${address.zipCode}` : 'Адрес*'}</div>
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
                      {order.trashCard.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <div className='d-flex justify-content-between'>
                            <div>
                              <img className='order_img' src={item.imageSrc} alt={item.name} />
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
                                  <p className='order_name_name'>{item.count}</p>
                                  <p className='order_name_name'>{item.selectedSize}</p>
                                  <div style={{backgroundColor: item.selectedColor}} className='order_name_color'></div>
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
                          <p className='basket_total_title' style={{marginBottom: '28px'}}>Доставка</p>
                          <p className='basket_total_title' style={{marginBottom: '28px'}}>Скидки</p>
                          <p className='basket_total_title'>Итого</p>
                        </div>
                        <div style={{textAlign: 'right'}}>
                          <p className='basket_total_price' style={{marginBottom: '28px'}}>{products_total}</p>
                          <p className='basket_total_price' style={{marginBottom: '28px'}}>{delivery}</p>
                          <p className='basket_total_price' style={{marginBottom: '28px'}}>{sale ? sale : 0}</p>
                          <p className='basket_total_price'>{total}</p>
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
          ))}
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