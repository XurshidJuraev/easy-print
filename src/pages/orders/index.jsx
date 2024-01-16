import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderMain from '../../components/header';
import AdvantageMain from '../../components/advantage';
import FooterMain from '../../components/footer';
import trash from '../../layouts/icons/delete_product_basket.svg'
import go_to_checkout from '../../layouts/icons/Go_to_checkout.svg'
import return_to_cart from '../../layouts/icons/return_to_cart.svg'
import './main.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [trashCardData, setTrashCardData] = useState([]);
  const [sale, setSale] = useState('');
  const [total, setTotal] = useState('');
  const [delivery, setDelivery] = useState('');
  const [products_total, setProducts_total] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  });

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    const ordersString = localStorage.getItem('orders');
    try {
      const parsedOrders = ordersString ? JSON.parse(ordersString) : [];
      setOrders(parsedOrders);
    } catch (error) {
      toast.error('Xatolik yuz berdi. Iltimos qaytadan urining!');
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
        setSale(response.data.data.coupon_price);
        setTotal(response.data.data.price);
        setDelivery(response.data.data.discount_price);
        setProducts_total(response.data.data.grant_total);
        setOrders(response.data.data);
      } catch (error) {
        toast.error('Xatolik yuz berdi. Iltimos qaytadan urining!');
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
        setAddress(response.data.data);
      } catch (error) {
        toast.error('Xatolik yuz berdi. Iltimos qaytadan urining!');
      }
    };

    fetchData();
  }, [token]);

  function saveOrder() {
    var myHeaders = new Headers();
    myHeaders.append("language", "uz");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("order_id", localStorage.getItem('order_id') ? localStorage.getItem('order_id') : null);
    formdata.append("address_id", addressId);
    formdata.append("receiver_name", localStorage.getItem('user_name') ? localStorage.getItem('user_name') : null);
    formdata.append("receiver_phone", localStorage.getItem('user_phone_number') ? localStorage.getItem('user_phone_number') : null);
    formdata.append("payment_method", "1");
    formdata.append("user_card_id", "1");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_TWO}/order/accepted/order`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          toast.success('Заказ успешно оформлен!');
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          toast.error('Заказ не был оформлен!');
        }
      })
      .catch(error =>  toast.error('Xatolik yuz berdi. Iltimos qaytadan urining!'));
  }

  useEffect(() => {
    if (address.length > 0 && addressId === null) {
      setAddressId(address[0].id);
    }
  }, [address, addressId]);

  return (
    <div>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

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
                    <input className='order_info mt-4' value={localStorage.getItem('user_phone_number') ? `${localStorage.getItem('user_phone_number')}` : 'Действующий номер телефона*'}/>
                    
                    <h3 className='order_subtitle' style={{marginTop: '48px'}}>Адрес доставки</h3>

                    {address && address.length > 0 ? (
                      <select onChange={(e) => setAddressId(e.target.value)} className='order_info mt-2'>
                        {address.map((addr, index) => (
                          <option key={index} value={addr.id}>
                            {`${addr.region.name} ${addr.city && addr.city.name ? `${addr.city.name}, ` : ''}${addr.name}, ${addr.postcode}`}
                          </option>
                        ))}
                      </select>
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

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '24px'}}>
                      <button style={{width: '550px', margin: '0', textAlign: 'center', padding: '0'}} onClick={() => {saveOrder();}} className='hero_button center'>
                        Оформить заказ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="container">
        <NavLink to={'/'} className='basket_promo_btn_price'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M2 10.9961C2.00487 11.5226 2.21684 12.0259 2.59 12.3971L6.88 16.7002C7.06736 16.8866 7.32082 16.9912 7.585 16.9912C7.84919 16.9912 8.10264 16.8866 8.29 16.7002C8.38373 16.6072 8.45812 16.4965 8.50889 16.3746C8.55966 16.2526 8.5858 16.1218 8.5858 15.9897C8.5858 15.8576 8.55966 15.7268 8.50889 15.6048C8.45812 15.4829 8.38373 15.3722 8.29 15.2792L5 11.9968L21 11.9968C21.2652 11.9968 21.5196 11.8914 21.7071 11.7037C21.8946 11.516 22 11.2615 22 10.9961C22 10.7307 21.8946 10.4762 21.7071 10.2885C21.5196 10.1008 21.2652 9.99538 21 9.99538L5 9.99538L8.29 6.70301C8.4783 6.51589 8.58462 6.26159 8.58556 5.99603C8.58649 5.73048 8.48198 5.47543 8.295 5.28699C8.10802 5.09855 7.8539 4.99216 7.58854 4.99122C7.32317 4.99028 7.06831 5.09487 6.88 5.28198L2.59 9.58508C2.21441 9.9587 2.00223 10.4661 2 10.9961Z" fill="white"/>
          </svg>
          Вернуться в корзину
        </NavLink>
      </div>

      <AdvantageMain />
      <FooterMain />
    </div>
  );
}

export default MyOrders;