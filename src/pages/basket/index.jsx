import React, { useEffect, useState } from 'react';
import HeaderMain from '../../components/header';
import './main.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import pencil from '../../layouts/icons/edit_product_basket.svg'
import trash from '../../layouts/icons/delete_product_basket.svg'
import no_data from '../../layouts/images/no_trash.svg'
import continue_shopping from '../../layouts/images/continue_shopping.svg'
import AdvantageMain from '../../components/advantage';
import FooterMain from '../../components/footer';

function Basket() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [promoMessageColor, setPromoMessageColor] = useState('green');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  function handleCountChange(id, change) {
    const updatedTrashCardData = trashCardData.map((item) => {
      if (item.id === id) {
        const newCount = item.count + change;
        return { ...item, count: newCount < 1 ? 1 : newCount };
      }
      return item;
    });
    setTrashCardData(updatedTrashCardData);

    localStorage.setItem('trashCard', JSON.stringify(updatedTrashCardData));
  }

  function applyPromoCode() {
    let promoMessage = '';
    let promoColor = 'green';

    if (promoCode === 'PROMO123') {
      setDiscount(10);
      promoMessage = `Siz kiritgan ${promoCode} muvaffaqiyatli kirildi!`;
    } else {
      setDiscount(0);
      promoMessage = `Afsus siz kiritgan ${promoCode} ishlamadi`;
      promoColor = 'red';
    }

    setPromoMessage(promoMessage);
    setPromoMessageColor(promoColor);

    setTimeout(() => {
      setPromoMessage('');
    }, 10000);
  } 

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard')) || [];
    setTrashCardData(savedCards);
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard')) || [];
    setTrashCardData(savedCards);
    calculateTotalPrice(savedCards); // localstoragedan o'qib olgan malumotlar bilan hisoblash
  }, []);
  
  function calculateTotalPrice(data) {
    if (!data || data.length === 0) {
      return 0;
    }
  
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const price = parseInt(data[i].price.replace(/\s/g, ''), 10);
      const count = data[i].count;
      total += price * count;
    }
  
    if (promoCode === 'PROMO123') {
      const discountAmount = (total * discount) / 100;
      total -= discountAmount;
    }
  
    return total;
  }  

  const navigate = useNavigate();

  function saveOrder() {
    const order = {
      id: new Date().getTime(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      userName: localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')).name : "Foydalanuvchi nomi",
      trashCard: trashCardData,
      phoneNumber : localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')).phoneNumber : "Foydalanuvchi raqami",
      promoCode: promoCode,
      totalAmount: calculateTotalPrice(trashCardData),
      region: region,
      city: city,
      address: address,
      productsTotal: calculateTotalPrice(trashCardData).toLocaleString('ru-RU') + ' сум',
      deliveryCharge: '52 000 сум',
      promoCodeAmount: (calculateTotalPrice(trashCardData) * discount / 100).toLocaleString('ru-RU') + ' сум',
      total: (calculateTotalPrice(trashCardData) - (calculateTotalPrice(trashCardData) * discount / 100) + 52000).toLocaleString('ru-RU') + ' сум'
    };
  
    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    navigate('/orders');
  }

  return (
    <div>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

      <div className="container" style={{ marginTop: '32px'  }}>
        <div>
          {trashCardData.length === 0 ? (
            <>
              <div className='basket_wrapper' style={{height: '600px'}}>
                <h3 style={{marginLeft: '24px'}} className='basket_big_title mt-3'>Корзина</h3>
                <center style={{marginTop: '115px'}}>
                  <img className='mt-3' src={no_data} alt="no_data" />
                </center>
              </div>
            </>
          ) : (
            <>
              <div className='basket_wrapper'>
                <div className='mt-3 d-flex justify-content-between'>
                  <h3 style={{marginLeft: '24px'}} className='basket_big_title'>Корзина</h3>

                  <div className='d-flex justify-content-between' style={{width: '571px', marginRight: '74px'}}>
                    <p className='basket_item'>Цена</p>
                    <p className='basket_item'>Количество</p>
                    <p className='basket_item'>Скидка</p>
                    <p className='basket_item'>Сумма</p>
                  </div>
                </div>

                <hr />

                <div>
                  <div>
                    {trashCardData.map((item) => (
                      <div key={item.id}>
                        <div className='d-flex basket_card'>
                          <div>
                            <img className='basket_card_img' src={item.imageSrc} alt={item.name} />

                            <div className='d-flex basket_size_fat'>
                              <div className='d-flex'>
                                <p className='basket_card_size'>Размер:</p>
                                <select className='basket_card_size_select'>
                                  <option value="XL">XL</option>
                                </select>
                              </div>

                              <div className='d-flex' style={{marginLeft: '48px'}}>
                                <p className='basket_card_size'>Цвет:</p>
                                <div className="d-flex align-items-center" style={{marginTop: '-10px'}}>
                                  <div className='basket_card_size_color'></div>
                                  <svg style={{marginLeft: '8px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 13C7.72592 13.0004 7.45444 12.9511 7.20118 12.8547C6.94792 12.7583 6.71786 12.6169 6.52423 12.4385L1.79945 8.09254C1.36915 7.69675 1.36918 7.01767 1.79951 6.62192C2.18181 6.27034 2.76973 6.27034 3.15203 6.62192L8 11.0803L12.848 6.62189C13.2303 6.27033 13.8182 6.27033 14.2004 6.62189C14.6308 7.01764 14.6308 7.69674 14.2004 8.0925L9.47577 12.4375C9.28223 12.6161 9.05221 12.7577 8.79894 12.8543C8.54567 12.9508 8.27415 13.0003 8 13Z" fill="#32454B"/>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="basket_info1">
                            <div style={{marginRight: '110px'}}>
                              <p className='basket_card_name'>{item.name}</p>
                            </div>

                            <div style={{marginRight: '51px'}}>
                              <p className='basket_card_price'>{item.price} сум</p>
                            </div>

                            <div className='d-flex basket_counter12' style={{marginRight: '105px'}}>
                              <div>
                                <div className='basket_card_count'>{item.count}</div>
                              </div>
                              <div className='d-flex flex-column'>
                                <div className='basket_card_plus_minus' onClick={() => handleCountChange(item.id, 1, item.price + item.count)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 3C8.27408 2.99956 8.54556 3.04894 8.79882 3.1453C9.05208 3.24166 9.28214 3.38311 9.47577 3.5615L14.2006 7.90746C14.6308 8.30325 14.6308 8.98233 14.2005 9.37808C13.8182 9.72966 13.2303 9.72966 12.848 9.37808L8 4.91965L3.152 9.37811C2.76972 9.72967 2.18183 9.72967 1.79955 9.37811C1.36921 8.98236 1.36921 8.30326 1.79955 7.9075L6.52423 3.56246C6.71777 3.38389 6.94779 3.24228 7.20106 3.14575C7.45433 3.04922 7.72585 2.99969 8 3Z" fill="#999999"/>
                                  </svg>
                                </div>
                                <div className='basket_card_plus_minus' onClick={() => handleCountChange(item.id, -1, item.price - item.count)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 13C7.72592 13.0004 7.45444 12.9511 7.20118 12.8547C6.94792 12.7583 6.71786 12.6169 6.52423 12.4385L1.79945 8.09254C1.36915 7.69675 1.36918 7.01767 1.79951 6.62192C2.18181 6.27034 2.76973 6.27034 3.15203 6.62192L8 11.0803L12.848 6.62189C13.2303 6.27033 13.8182 6.27033 14.2004 6.62189C14.6308 7.01764 14.6308 7.69674 14.2004 8.0925L9.47577 12.4375C9.28223 12.6161 9.05221 12.7577 8.79894 12.8543C8.54567 12.9508 8.27415 13.0003 8 13Z" fill="#999999"/>
                                  </svg>
                                </div>
                              </div>
                            </div>

                            <div style={{marginRight: '114px'}}>
                              <p className='basket_card_price_sale'>0 сум</p>
                            </div>

                            <div>
                              <p className='basket_card_price' id='all_price'>{item.price} сум</p>
                            </div>
                          </div>
                        </div>

                        <hr />

                        <div className='d-flex basket_size_fat2'>
                          <div className='d-flex'>
                            <NavLink to={'#'}>
                              <img src={pencil} alt={pencil} />
                            </NavLink>
                          </div>

                          <div className='d-flex' style={{marginLeft: '48px'}}>
                            <NavLink to={'#'}>
                              <img src={trash} alt={trash} />
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <NavLink to={'/'}>
          <img style={{marginTop: '32px'}} src={continue_shopping} alt="continue_shopping" />
        </NavLink>

        <div className="basket_wrapper" style={{marginTop: '36px'}}>
          <div className="d-flex justify-content-between">
            <div style={{width: '320px'}}>
              <h3 className='basket_promo_title'>Промокод</h3>
              <p className='basket_promo_text'>Введите промокод чтобы активировать скидку</p>
              <input className='basket_promo' type="text" placeholder='Введите промокод' value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
              <p style={{ color: promoMessageColor }} className='basket_promo_text'>{promoMessage}</p>
              <p className='basket_promo_text' style={{marginTop: '32px'}}>*Вы можете использовать только один промокод в одном заказе</p>
              <center style={{marginTop: '27px'}}>
                <button onClick={applyPromoCode} className='basket_promo_btn'>Применить</button>
              </center>
            </div>

            <div style={{width: '340px'}}>
              <h3 className='basket_promo_title'>Рассчитать стоимость доставки</h3>
              <select
                className={`basket_promo ${region ? '' : 'red-border'}`}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Область</option>
                <option value="aa">aa</option>
                <option value="bb">bb</option>
              </select>
              <select 
                className={`basket_promo ${city ? '' : 'red-border'}`}
                value={city}
                onChange={(e) => setCity(e.target.value)}>
                <option value="Город">Город</option>
                <option value="aa">aa</option>
                <option value="bb">bb</option>
              </select>
              <input value={address} onChange={(e) => setAddress(e.target.value)} className={`basket_promo ${address ? '' : 'red-border'}`} type="text" placeholder='Улица и дом' />
              <center style={{marginTop: '56px'}}>
                <button style={{width: '330px', height: '56px', padding: '0'}} className='basket_promo_btn'>Выбрать из добавленных адресов</button>
              </center>
            </div>

            <div style={{width: '350px'}}>
              <div className="basket_total">
                <div>
                  <p className='basket_total_title' style={{marginBottom: '28px'}}>Итог товаров</p>
                  <p className='basket_total_title' style={{marginBottom: '28px'}}>Доставка</p>
                  <p className='basket_total_title' style={{marginBottom: '28px'}}>Скидки</p>
                  <p className='basket_total_title'>Итого</p>
                </div>
                <div style={{textAlign: 'right'}}>
                  <p className='basket_total_price' style={{marginBottom: '28px'}}>
                    {calculateTotalPrice(trashCardData).toLocaleString('ru-RU')} сум
                  </p>
                  <p className='basket_total_price' style={{marginBottom: '28px'}}>52 000 сум</p>
                  <p className='basket_total_price' style={{marginBottom: '28px'}}>
                    {promoCode === 'PROMO123' ? (
                      (calculateTotalPrice(trashCardData) * discount / 100).toLocaleString('ru-RU') + ' сум'
                    ) : '0 сум'}
                  </p>
                  <p className='basket_total_price'>{(calculateTotalPrice(trashCardData) - (calculateTotalPrice(trashCardData) * discount / 100) + 52000).toLocaleString('ru-RU')} сум</p>
                </div>
              </div>
              <button className='basket_promo_btn_price' onClick={() => {saveOrder();}}>
                Перейти к оформлению 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 13.0039C21.9951 12.4774 21.7832 11.9741 21.41 11.6029L17.12 7.29979C16.9326 7.11341 16.6792 7.00879 16.415 7.00879C16.1508 7.00879 15.8974 7.11341 15.71 7.29979C15.6163 7.39282 15.5419 7.5035 15.4911 7.62545C15.4403 7.7474 15.4142 7.8782 15.4142 8.0103C15.4142 8.14241 15.4403 8.27321 15.4911 8.39516C15.5419 8.5171 15.6163 8.62778 15.71 8.72081L19 12.0032H3C2.73478 12.0032 2.48043 12.1086 2.29289 12.2963C2.10536 12.484 2 12.7385 2 13.0039C2 13.2693 2.10536 13.5238 2.29289 13.7115C2.48043 13.8992 2.73478 14.0046 3 14.0046H19L15.71 17.297C15.5217 17.4841 15.4154 17.7384 15.4144 18.004C15.4135 18.2695 15.518 18.5246 15.705 18.713C15.892 18.9015 16.1461 19.0078 16.4115 19.0088C16.6768 19.0097 16.9317 18.9051 17.12 18.718L21.41 14.4149C21.7856 14.0413 21.9978 13.5339 22 13.0039Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </div>
  );
}

export default Basket;