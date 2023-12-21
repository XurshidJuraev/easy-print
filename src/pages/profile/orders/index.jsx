import React, { useEffect, useState } from 'react'
import HeaderMain from '../../../components/header'
import AdvantageMain from '../../../components/advantage'
import FooterMain from '../../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../main.css';
import ProfileHeader from '../../../components/profile_header';
import no_addres from '../../../layouts/images/no_order.svg';

function ProfileOrders() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [formData, setFormData] = useState({
    region: '',
    city: '',
    street: '',
    zipCode: ''
  });

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('userLocation'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  const orders = JSON.parse(localStorage.getItem('Orders'))

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

      <div className="container mt-5">
        <div className="d-flex align-items-center justify-content-between">
          <ProfileHeader />

          <div className='info_profile'>
            <h3 className='user_name'>Мои заказы</h3>

            {orders ? (
              <div>
                <div style={{ height: '400px', overflow: 'scroll' }}>
                  {orders.map((order, index) => (
                    <div key={index}>
                      <p>id: {index + 1}</p>
                      <p>Discount: {order.discount}</p>
                      {order.giftPackagingAdded && (
                        <p>Gift Packaging Added: 10 000 сум</p>
                      )}
                      <p>Total With Discount: {order.totalWithDiscount}</p>
                      <p>Total Without Discount: {order.totalWithoutDiscount}</p>
                      <ul>
                        {order.items.map((item, itemIndex) => (
                          <div>
                            <li key={itemIndex}>{item.name}</li>
                            <img src={item.imageSrc} alt={item.name} />
                          </div>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <button className='btn_profile'>Добавить адрес</button>
                </div>
              </div>
            ) : (
              <center style={{ marginTop: '56px' }}>
                <img src={no_addres} alt="no_addres" />
                <p className='no_address_text'>Вы ещё не оформляли заказ</p>
              </center>
            )}
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </>
  );
}

export default ProfileOrders