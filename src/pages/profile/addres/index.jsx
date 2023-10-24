import React, { useEffect, useState } from 'react'
import HeaderMain from '../../../components/header'
import AdvantageMain from '../../../components/advantage'
import FooterMain from '../../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../main.css';
import ProfileHeader from '../../../components/profile_header';
import no_addres from '../../../layouts/images/address.svg';

function ProfileAddres() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userLocation', JSON.stringify(formData));
    toast.success('Malumotlar saqlandi!');
  };

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('userLocation'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  const address = JSON.parse(localStorage.getItem('userLocation'))

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

      <div className="container mt-5">
        <div className="d-flex align-items-center justify-content-between">
          <ProfileHeader />

          <div className='info_profile'>
            <h3 className='user_name'>Мои адреса</h3>

            {address ? (
              <div>
                <div style={{height: '400px', overflow: 'scroll'}}>
                  <div className='user_address'>
                    <div>
                      {address.region}, {address.city}, {address.street}, {address.zipCode}
                    </div>
                    <div>

                    <button style={{backgroundColor: 'transparent', border: 'none'}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M18.205 1.79505C17.6951 1.28594 17.004 1 16.2835 1C15.5629 1 14.8718 1.28594 14.362 1.79505L1 15.157V19H4.84299L18.205 5.63803C18.7139 5.12805 18.9997 4.43701 18.9997 3.71654C18.9997 2.99607 18.7139 2.30503 18.205 1.79505ZM4.22499 17.5H2.5V15.775L12.4825 5.80003L14.2075 7.52503L4.22499 17.5ZM17.1445 4.57754L15.2642 6.45778L13.543 4.73279L15.4225 2.85554C15.6512 2.62679 15.9615 2.49828 16.285 2.49828C16.6085 2.49828 16.9187 2.62679 17.1475 2.85554C17.3762 3.08429 17.5047 3.39454 17.5047 3.71804C17.5047 4.04154 17.3762 4.35179 17.1475 4.58054L17.1445 4.57754Z" fill="#4D646B"/>
                      </svg>
                    </button>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'end'}}>
                  <button className='btn_profile'>Добавить адрес</button>
                </div>
              </div>
            ) : (
              <center style={{marginTop: '56px'}}>
                <img src={no_addres} alt="no_addres" />
                <p className='no_address_text'>Вы ещё не добавляли адрес</p>
                <button className='no_address_button' data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить адрес</button>
              </center>
            )}

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header text-center d-flex justify-content-center" style={{borderBottom: 'none'}}>
                    <center>
                      <h1 className="modal-title modal_title" id="exampleModalLabel">Ваш адрес</h1>
                    </center>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center ms-4">
                        <p className='address_modal_text'>Область</p>

                        <select name="region" className='input_profile' value={formData.region} onChange={handleChange}>
                          <option disabled hidden value="">Область</option>
                          <option value="Алмазарский район">Алмазарский район</option>
                          <option value="Бектемирский район">Бектемирский район</option>
                          <option value="Мирабадский район">Мирабадский район</option>
                          <option value="Мирзо-Улугбекский район">Мирзо-Улугбекский район</option>
                          <option value="Сергелийский район">Сергелийский район</option>
                          <option value="Чиланзарский район">Чиланзарский район</option>
                          <option value="Шайхантаурский район">Шайхантаурский район</option>
                          <option value="Юнусабадский район">Юнусабадский район</option>
                          <option value="Яккасарайский район">Яккасарайский район</option>
                          <option value="Яшнабадский район">Яшнабадский район</option>
                          <option value="Учтепинский район">Учтепинский район</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center ms-5">
                        <p className='address_modal_text'>Город</p>

                        <select name="city" className='input_profile' value={formData.city} onChange={handleChange}>
                          <option disabled hidden value="">Город</option>
                          <option value="Республика Каракалпакстан">Республика Каракалпакстан</option>
                          <option value="Андижанская область">Андижанская область</option>
                          <option value="Бухарская область">Бухарская область</option>
                          <option value="Джизакская область">Джизакская область</option>
                          <option value="Кашкадарьинская область">Кашкадарьинская область</option>
                          <option value="Навоийская область">Навоийская область</option>
                          <option value="Наманганская область">Наманганская область</option>
                          <option value="Самаркандская область">Самаркандская область</option>
                          <option value="Сурхандарьинская область">Сурхандарьинская область</option>
                          <option value="Сырдарьинская область">Сырдарьинская область</option>
                          <option value="Ташкентская область">Ташкентская область</option>
                          <option value="Ферганская область">Ферганская область</option>
                          <option value="Хорезмская область">Хорезмская область</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center ms-4">
                        <p className='address_modal_text'>Ул. и дом</p>

                        <input type="text" className='input_profile' placeholder="Дата рождения" onfocus="(this.type='date')" name="street" value={formData.street} onChange={handleChange} />
                      </div>

                      <div className="d-flex align-items-center ms-4">
                        <p style={{marginRight: '0px'}} className='address_modal_text'>Почтовый индекс</p>

                        <input style={{marginRight: '40px'}} type="text" className='input_profile' placeholder="Дата рождения" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '138px' }}>
                        <button type="submit" className='btn_profile'>Добавить адрес</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </>
  );
}

export default ProfileAddres