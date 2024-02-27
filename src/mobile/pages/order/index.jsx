import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderMainMobile from '../../components/header';
import FooterMainMobile from '../../components/footer';
import FooterBarMobile from '../../components/footer bar';
import cards from '../../layouts/images/cards.svg'
import delete_product_basket from '../../layouts/icons/delete_product_basket.svg'
import './main.css';

function OrderMobile() {
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [trashCardData, setTrashCardData] = useState([]);
  const [sale, setSale] = useState('');
  const [total, setTotal] = useState('');
  const [delivery, setDelivery] = useState('');
  const [nullAddres, setNullAddres] = useState(false);
  const [nullName, setNullName] = useState(false);
  const [nullPhoneNumber, setNullPhoneNumber] = useState(false);
  const [products_total, setProducts_total] = useState('');
  const [editAddressId, setEditAddressId] = useState(null);
  const [adrse, setAdrse] = useState('');
  const [pickapAdrse, setPickapAdrse] = useState('');
  const [pickapAdrseCheck, setPickapAdrseCheck] = useState('');
  const [selectedPickapAdrs, setSelectedPickapAdrs] = useState(null);
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [formData, setFormData] = useState({
    city_id: '',
    name: '',
    postcode: '',
  });
  const [formErrors, setFormErrors] = useState({
    region: false,
    city_id: false,
    name: false,
    postcode: false,
  });

  const handleCloseModal = () => {
    setFormData({
      city_id: '',
      name: '',
      postcode: '',
    });
    setEditAddressId(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

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
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    }
  }, []);

  const token = localStorage.getItem('token');
  const order_id = localStorage.getItem('order_id');

  const paymentDate = localStorage.getItem('paymentDate')
  const jsonPaymentDate = JSON.parse(paymentDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TWO}/order/get-order?order_id=${order_id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
          }
        });
        setSale(response.data.data.coupon_price);
        setTotal(response.data.data.price);
        setDelivery(response.data.data.discount_price);
        setProducts_total(response.data.data.grant_total);
        setOrders(response.data.data);
        setAdrse(response.data.data.list.length)
        console.log(response.data.data);
      } catch (error) {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
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
            Accept: "application/json",
            'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
          }
        });
        setAddress(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TWO}/pick-up-point`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            language: localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
          },
        });
        setPickapAdrse(response.data.data);
        setPickapAdrseCheck(response.data.data[0].id);
        if (response.data.data.length > 0) {
          setSelectedPickapAdrs(response.data.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  const handlePickapAdrsChange = (index) => {
    setSelectedPickapAdrs(pickapAdrse[index]);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TWO}/get-districts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
        },
      })
      .then((response) => {
        setData(response.data.data);
        const initialRegion = response.data.data[0];
        setFormData({
          city_id: initialRegion.cities[0]?.id,
          name: '',
          postcode: ''
        });
        setCities(initialRegion.cities);
      })
      .catch((error) => {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      });
  }, [token]);

  setTimeout(() => {
    setNullAddres(false)
    setNullName(false)
    setNullPhoneNumber(false)
  }, 5000);

  function saveOrder() {
    var myHeaders = new Headers();
    myHeaders.append("language", "uz");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("order_id", localStorage.getItem('order_id') ? localStorage.getItem('order_id') : null);
    formdata.append("address_id", addressId);
    if (addressId === null) {
      toast.warning(localStorage.getItem('selectedLanguage') === 'ru' ? 'Вы не можете отправить свой заказ. Потому что у тебя нет адреса. Выберите свой адрес и отправьте.' : `Buyurtmani yubora olmaysiz. Chunki sizda manzil yo'q. Manzilingizni tanlang va yuboring.`);
      setNullAddres(true)
      return;
    } else {
      formdata.append("address_id", addressId);
    }
    formdata.append("receiver_name", localStorage.getItem('user_name') ? localStorage.getItem('user_name') : null);
    if (localStorage.getItem('user_name') === null) {
      toast.warning(localStorage.getItem('selectedLanguage') === 'ru' ? 'Похоже, ваше имя недоступно для подтверждения заказа. Пожалуйста, создайте себе имя на странице своего профиля.' : `Buyurtmani tasdiqlash uchun ismingiz mavjud emasga o'xshaydi. Iltimos, profil sahifangizda o'zingiz uchun nom yarating.`);
      setNullName(true)
      return;
    } else {
      formdata.append("receiver_name", localStorage.getItem('user_name') ? localStorage.getItem('user_name') : null);
    }
    formdata.append("receiver_phone", localStorage.getItem('user_phone_number') ? localStorage.getItem('user_phone_number') : null);
    if (localStorage.getItem('user_phone_number') === null) {
      toast.warning(localStorage.getItem('selectedLanguage') === 'ru' ? 'Ваш номер телефона для подтверждения заказа недоступен. Пожалуйста, подтвердите себя, добавив свой номер телефона на странице своего профиля.' : `Buyurtmani tasdiqlash uchun telefon raqamingiz mavjud emas. Profil sahifangizga telefon raqamingizni qoʻshish orqali oʻzingizni tasdiqlang.`);
      setNullPhoneNumber(true)
      return;
    } else {
      formdata.append("receiver_phone", localStorage.getItem('user_phone_number') ? localStorage.getItem('user_phone_number') : null);
    }
    formdata.append("payment_method", "1");
    formdata.append("user_card_id", "1");

    console.log("order_id:", localStorage.getItem('order_id') ? localStorage.getItem('order_id') : null);
    console.log("address_id:", deliveryMethod === 'pickup' ? pickapAdrseCheck : addressId);
    console.log("receiver_name:", localStorage.getItem('user_name') ? localStorage.getItem('user_name') : null);
    console.log("receiver_phone:", localStorage.getItem('user_phone_number') ? localStorage.getItem('user_phone_number') : null);
    console.log("payment_method:", "1");
    console.log("user_card_id:", "1");

    var requestOptions = {
      Accept: 'application/json',
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    console.log(requestOptions);

    fetch(`${process.env.REACT_APP_TWO}/order/accepted/order`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          toast.success('Заказ успешно оформлен!');
          setTimeout(() => {
            navigate('/');
            localStorage.setItem('counterValue', 0);
          }, 1500);
        } else {
          toast.error('Заказ не был оформлен!');
        }
      })
      .catch(error =>  toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'));
  }

  const handleChange = (e) => {
    const selectedRegion = e.target.value;
    setFormData({ ...formData, [e.target.name]: selectedRegion });

    const selectedRegionData = data.find((region) => region.region === selectedRegion);

    if (selectedRegionData) {
      const selectedCities = selectedRegionData.cities || [];
      setCities(selectedCities);
    }

    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === '',
    }));
  };

  useEffect(() => {
    if (address.length > 0 && addressId === null) {
      setAddressId(address[0].id);
    }
  }, [address, addressId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.region === '' || formData.city_id === '' || formData.name === '' || formData.postcode === '') {
      toast.warning('Обязательно заполните все детали. Пожалуйста, проверьте все и отправьте повторно. Или обновите страницу еще раз и повторите попытку.');
      return;
    }

    const apiUrl = editAddressId ? `${process.env.REACT_APP_TWO}/edit-address` : `${process.env.REACT_APP_TWO}/set-address`;

    axios
      .post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        toast.success('Malumotlar saqlandi!');
        handleCloseModal();
        window.location.reload();
      })
      .catch((error) => {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      });
  };

  return (
    <div>
      <HeaderMainMobile />

      <center style={{padding: '16px'}}>
        <div style={{textAlign: 'left', width: '100%', padding: '12px', marginTop: '12px', backgroundColor: '#FFFFFF'}}>
          <h3 className='basket_name_mobile_title'>Ваш заказ</h3>
          
          {orders && orders.list && orders.list.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <>
              <div>
                {orders && orders.list && orders.list.map((item, itemIndex) => (
                  <div key={itemIndex} style={{marginBottom: '12px'}}>
                    <div className='d-flex'>
                      <div>
                        {item.images && item.images[0] && (
                          <div style={{width: '130px', height: '180px', backgroundColor: '#F6F6F6', backgroundImage: `url(${item.images[0]})`, borderRadius: '8px', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}></div>
                        )}
                      </div>

                      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '12px'}}>
                        <p className='order_name_mobile'>{item.name}</p>
                        <div className="d-flex">
                          <div className='d-flex' style={{marginTop: '-44px'}}>
                            <div>
                              <p style={{marginBottom: '0'}} className='order_name_tite'>Количество: <span className='order_name_name ms-2' style={{fontFamily: 'Inter500', color: '#1A1A1A'}}>{item.quantity}</span></p>
                              <p style={{marginBottom: '0'}} className='order_name_tite'>Размер: <span className='order_name_name ms-2' style={{color: '#1A1A1A'}}>{item.size_name}</span></p>
                              <p style={{marginBottom: '0'}} className='order_name_tite d-flex'>Цвет: <div style={{ backgroundColor: item.color_code, width: '16px', height: '16px' }} className='order_name_color ms-2'></div></p>
                            </div>
                          </div>
                        </div>
                        <p style={{color: '#18356D', fontFamily: 'Inter400', marginBottom: '0', position: 'relative', top: '-37px'}} className='order_price'>{Number(item.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>
                      </div>
                    </div>

                    <center>
                      <img style={{marginTop: '20px', cursor: 'pointer'}} src={delete_product_basket} alt="delete_product_basket" />
                      <hr style={{marginTop: '20px', marginBottom: '20px'}} />
                    </center>
                  </div>
                ))}

                <div className="basket_total" style={{width: '100%'}}>
                  <div>
                    <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Итог товаров' : 'Jami maxsulotlar'}</p>
                    <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Доставка' : 'Yetkazib berish'}</p>
                    <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Скидки' : 'Chegirmalar'}</p>
                    <p className='basket_total_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Итого' : 'Jami'}</p>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <p className='basket_total_price' style={{marginBottom: '28px'}}>{Number(jsonPaymentDate?.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>
                    <p className='basket_total_price' style={{marginBottom: '28px'}}>{deliveryMethod === 'tashkent' || deliveryMethod === 'homeDelivery' ? 'Яндекс Go' : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}`}</p>
                    <p className='basket_total_price' style={{marginBottom: '28px'}}>{Number(jsonPaymentDate?.discount_price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>
                    <p className='basket_total_price'>{Number(jsonPaymentDate?.grant_total).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </center>

      <center style={{padding: '16px'}}>
        <NavLink style={{marginTop: '0px', width: '100%'}} to={'/mobile'} className='basket_promo_btn_price'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M2 10.9961C2.00487 11.5226 2.21684 12.0259 2.59 12.3971L6.88 16.7002C7.06736 16.8866 7.32082 16.9912 7.585 16.9912C7.84919 16.9912 8.10264 16.8866 8.29 16.7002C8.38373 16.6072 8.45812 16.4965 8.50889 16.3746C8.55966 16.2526 8.5858 16.1218 8.5858 15.9897C8.5858 15.8576 8.55966 15.7268 8.50889 15.6048C8.45812 15.4829 8.38373 15.3722 8.29 15.2792L5 11.9968L21 11.9968C21.2652 11.9968 21.5196 11.8914 21.7071 11.7037C21.8946 11.516 22 11.2615 22 10.9961C22 10.7307 21.8946 10.4762 21.7071 10.2885C21.5196 10.1008 21.2652 9.99538 21 9.99538L5 9.99538L8.29 6.70301C8.4783 6.51589 8.58462 6.26159 8.58556 5.99603C8.58649 5.73048 8.48198 5.47543 8.295 5.28699C8.10802 5.09855 7.8539 4.99216 7.58854 4.99122C7.32317 4.99028 7.06831 5.09487 6.88 5.28198L2.59 9.58508C2.21441 9.9587 2.00223 10.4661 2 10.9961Z" fill="white"/>
          </svg>
          {localStorage.getItem('selectedLanguage') === 'ru' ? 'Вернуться в корзину' : 'Savatga qaytish'}
        </NavLink>
      </center>

      <center style={{padding: '16px', textAlign: 'left', marginBottom: '237px'}}>
        <div>
          <div className="container">
            <div className='basket_wrapper' style={{ padding: '16px' }}>
              <div className="d-flex flex-column">
                <div>
                  <h2 className='basket_name_mobile_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Оформление заказа' : 'Buyurtmani rasmiylashtirish'}</h2>

                  <h3 className='order_subtitle' style={{marginTop: '48px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Покупатель' : 'Buyurtma qabul qiluvchi:'}</h3>

                  <input className='order_info' style={{border: nullName === true ? '1px solid red' : 'none', width: '100%'}} value={localStorage.getItem('user_name') ? localStorage.getItem('user_name') + ' ' + `${localStorage.getItem('user_last_name') ? localStorage.getItem('user_last_name') : ''}` : 'Имя и Фамилия*'}/>
                  <input className='order_info mt-4' style={{border: nullPhoneNumber === true ? '1px solid red' : 'none', width: '100%'}} value={localStorage.getItem('user_phone_number') === null ? `${localStorage.getItem('user_phone_number')}` : localStorage.getItem('selectedLanguage') === 'ru' ? 'Действующий номер телефона*' : `Joriy telefon raqami*`} />
                  
                  {(deliveryMethod === 'tashkent' || deliveryMethod === 'homeDelivery') && (
                    <>
                      <h3 className='order_subtitle' style={{marginTop: '48px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Адрес доставки' : 'Yetkazib berish manzili:'}</h3>

                      {address && address.length > 0 ? (
                        <>
                          <select onChange={(e) => {setAddressId(e.target.value); setNullAddres(false)}} style={{width: '100%'}} className='order_info mt-2'>
                            {address.map((addr, index) => (
                              <option key={index} value={addr.id}>
                                {`${addr.region.name} ${addr.city && addr.city.name ? `${addr.city.name}, ` : ''}${addr.name}, ${addr.postcode}`}
                              </option>
                            ))}
                          </select>

                          <center style={{marginTop: '28px'}}>
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" style={{border: 'none'}} className={'addres_btn'}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Добавить другой адрес' : 'Boshqa manzil kiritsh'}</button>
                          </center>
                        </>
                      ) : (
                        <>
                          <div data-bs-toggle="modal" data-bs-target="#exampleModal"  style={{border: nullAddres === true ? '1px solid red' : 'none'}} className='order_info'>
                            {localStorage.getItem('selectedLanguage') === 'ru' ? 'Адрес*' : 'Yetkazib berish*'}
                          </div>

                          <center style={{marginTop: '28px'}}>
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" style={{border: 'none'}} className={'addres_btn'}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Добавить адрес' : 'Manzil qo\'shish'}</button>
                          </center>
                        </>
                      )}
                    </>
                  )}

                  <h3 className='order_subtitle' style={{ marginTop: '48px' }}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Способ получения' : 'Qabul qilish usuli:'}</h3>

                  <label className='order_info' style={{width: '100%'}}>
                    <input style={{ cursor: 'pointer' }} type="radio" id="pickup" name="deliveryMethod" value="pickup" checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} />
                    <label style={{ cursor: 'pointer' }} htmlFor="pickup">{localStorage.getItem('selectedLanguage') === 'ru' ? 'Пункт выдачи Easy Print' : 'Easy Print topshirish punkti'}</label>
                  </label>

                  {(deliveryMethod === 'tashkent' || deliveryMethod === 'homeDelivery') && (
                    <label className='order_info' style={{ backgroundColor: 'transparent', display: 'none', width: '100%' }}>
                      <input style={{ cursor: 'pointer' }} type="radio" id="tashkent" name="deliveryMethod" value="tashkent" checked={deliveryMethod === 'tashkent'} onChange={() => setDeliveryMethod('tashkent')} />
                      <label style={{ cursor: 'pointer' }} htmlFor="tashkent">Ташкентская область, город Ташкент</label>
                    </label>
                  )}

                  <label className='order_info mt-2' style={{width: '100%'}}>
                    <input style={{ cursor: 'pointer' }} type="radio" id="homeDelivery" name="deliveryMethod" value="homeDelivery" checked={deliveryMethod === 'homeDelivery'} onChange={() => setDeliveryMethod('homeDelivery')} />
                    <label style={{ cursor: 'pointer' }} htmlFor="homeDelivery">{localStorage.getItem('selectedLanguage') === 'ru' ? 'Доставка до дома' : 'Kuryer orqali eshikkacha'}</label>
                  </label>

                  {deliveryMethod === 'pickup' && (
                    <div>
                      <h3 className='order_subtitle' style={{ marginTop: '48px' }}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Выберите пункт выдачи' : 'Topshirish punkti tanlang'}</h3>
                      {pickapAdrse && pickapAdrse.map((item, index) => (
                        <label className='order_info' key={index} style={{ backgroundColor: 'transparent', width: '100%' }}>
                          <input style={{ cursor: 'pointer', position: 'absolute' }} type="radio" id={`pickapAdrs_${index}`} value={index} checked={selectedPickapAdrs === item} onChange={() => {handlePickapAdrsChange(index); setPickapAdrseCheck(item.id)}} />
                          <label style={{ cursor: 'pointer', color: '#18356D', marginLeft: '30px' }} htmlFor={`pickapAdrs_${index}`}>
                            {item.region ? item.region : ''} {item.id ? '' : `${localStorage.getItem('selectedLanguage') === 'ru' ? 'Информация не найдена' : 'Malumot topilmadi'}`} {item.city ? item.city : ''} {item.name ? item.name : ''}
                          </label>
                        </label>
                      ))}
                    </div>
                  )}

                  {(deliveryMethod === 'tashkent' || deliveryMethod === 'homeDelivery') && (
                    <p className='order_text' style={{width: '100%'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Цена доставки будет зависеть от расстояния до вашего адреса' : `Yetkazib berish narxi sizning manzilingizgacha bo'lgan masofaga bog'liq bo'ladi`}</p>
                  )}

                  <h3 className='order_subtitle' style={{ marginTop: '48px' }}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Способ оплаты' : 'To\'lov turi'}</h3>

                  <label className='order_info' style={{width: '100%'}}>
                    <input style={{ cursor: 'pointer' }} type="radio" id="card" name="pay" value="30" checked={selectedPaymentMethod === 'card'} onChange={() => setSelectedPaymentMethod('card')} />
                    <label style={{ cursor: 'pointer' }} htmlFor="card">{localStorage.getItem('selectedLanguage') === 'ru' ? 'Картой онлайн' : 'Karta orqali onlayn'}</label>
                  </label>

                  {selectedPaymentMethod === 'card' && (
                    <img src={cards} alt="cards" />
                  )}

                  <label className='order_info mt-2' style={{width: '100%'}}>
                    <input style={{ cursor: 'pointer' }} type="radio" id="naxt" name="pay" value="60" checked={selectedPaymentMethod === 'cash'} onChange={() => setSelectedPaymentMethod('cash')} />
                    <label style={{ cursor: 'pointer' }} htmlFor="naxt">{localStorage.getItem('selectedLanguage') === 'ru' ? 'Наличными, при получении' : 'Naqd pul yoki karta orqali qabul qilganda'}</label>
                  </label>
                </div>
              </div>

              <button style={{width: '100%', marginTop: '36px', marginLeft: '0', textAlign: 'center', padding: '0'}} onClick={() => {saveOrder();}} className='hero_button center'>
                {localStorage.getItem('selectedLanguage') === 'ru' ? 'Оформить заказ' : 'Buyurtmani rasmiylashtirish'}
              </button>
            </div>
          </div>
        </div>
      </center>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default OrderMobile