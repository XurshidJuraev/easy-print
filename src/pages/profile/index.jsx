import React, { useEffect, useState } from 'react'
import HeaderMain from '../../components/header'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';
import ProfileHeader from '../../components/profile_header';
import no_image from '../../layouts/images/user.png';
import edit_image from '../../layouts/icons/edit_iamge.svg';

function Profile() {
  const [trashCardData, setTrashCardData] = useState([]);
  const email = localStorage.getItem('email');
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    birthDate: '',
    lastName: '',
    email: email,
    gender: ''
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
    localStorage.setItem('formData', JSON.stringify(formData));
    toast.success('Malumotlar saqlandi!');
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setFormData({ ...formData, email: savedEmail });
    }
  }, []);

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

      <div className="container mt-5">
        <div className="d-flex align-items-center justify-content-between">
          <ProfileHeader />

          <div className='info_profile'>
            <h3 className='user_name'>Личная информация</h3>

            <div className="d-flex">
              <img style={{ width: '100px', height: '100px' }} src={no_image} alt="no_image" />
              <img style={{ marginLeft: '34px' }} src={edit_image} alt="edit_image" />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="d-flex">
                <div>
                  <input type="text" className='input_profile' placeholder='Имя' name="name" value={formData.name} onChange={handleChange} />
                  <input type="tel" className='input_profile' placeholder='Номер телефона' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                  <input type="text" className='input_profile' placeholder="Дата рождения" onfocus="(this.type='date')" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                </div>

                <div>
                  <input type="text" className='input_profile' placeholder='Фамилия' name="lastName" value={formData.lastName} onChange={handleChange} />
                  <input type="mail" className='input_profile' placeholder='E-mail' value={formData.email} onChange={handleChange} />
                  <select name="gender" className='input_profile' value={formData.gender} onChange={handleChange}>
                    <option disabled hidden value="">Пол</option>
                    <option value="Мужской">Мужской</option>
                    <option value="Женский">Женский</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '138px' }}>
                <button type="submit" className='btn_profile'>Изменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </>
  );
}

export default Profile