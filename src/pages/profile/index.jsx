import React, { useEffect, useState } from 'react'
import HeaderMain from '../../components/header'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';
import ProfileHeader from '../../components/profile_header';
import no_image from '../../layouts/images/user.svg';
import edit_image from '../../layouts/icons/edit_iamge.svg';
import axios from 'axios';
import InputMask from 'react-input-mask';

function Profile() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    birthDate: '',
    lastName: '',
    email: '',
    gender: ''
  });
  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (savedCards) {
  //     setTrashCardData(savedCards);
  //   }
  // }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // localStorage.setItem('formData', JSON.stringify(formData));
  };

  // useEffect(() => {
  //   const savedEmail = localStorage.getItem('email');
  //   if (savedEmail) {
  //     setFormData({ ...formData, email: savedEmail });
  //   }
  // }, []);

  // useEffect(() => {
  //   const savedFormData = JSON.parse(localStorage.getItem('formData'));
  //   if (savedFormData) {
  //     setFormData(savedFormData);
  //   }
  // }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/personal-information`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': `${localStorage.getItem('selectedLanguage')}`
      }
    }).then((response) => {
      const responseData = response.data.data;
      localStorage.setItem('user_name', responseData.first_name === null ? '' : responseData.first_name);
      localStorage.setItem('user_last_name', responseData.last_name === null ? '' : responseData.last_name);
      localStorage.setItem('user_image', responseData.image === null ? '' : responseData.image);
      localStorage.setItem('user_phone_number', responseData.phone_number === null ? '' : responseData.phone_number);
      setData({
        id: responseData.id,
        name: responseData.first_name,
        lastName: responseData.last_name,
        phoneNumber: responseData.phone_number,
        gender: responseData.gender,
        birthDate: responseData.birth_date,
        img: responseData.image,
        email: responseData.email
      });
      setFormData({
        name: responseData.first_name,
        lastName: responseData.last_name,
        phoneNumber: responseData.phone_number,
        gender: responseData.gender,
        birthDate: responseData.birth_date,
        img: responseData.image,
        email: responseData.email
      });
    }).catch((error) => {
      console.log(error);
    });
  }, [token]);

  const handleUpdateBackend = () => {
    var myHeaders = new Headers();
    myHeaders.append("language", `${localStorage.getItem('selectedLanguage')}`);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("first_name", formData.name);
    formdata.append("last_name", formData.lastName);
    formdata.append("phone_number", formData.phoneNumber);
    formdata.append("gender", formData.gender);
    formdata.append("email", formData.email);
    formdata.append("image", formData.img);
    formdata.append("birth_date", formData.birthDate);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_TWO}/personal-information`, requestOptions)
      .then(response => response.text())
      .then(result => {toast.success('Malumotlar yuborildi!')})
      .catch(error => {console.log('error', error); toast.error('Xatolik yuz berdi. Malumotlar yuborilmadi.')});
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
  
    if (imageFile) {
      const blob = new Blob([imageFile]);
      const imageUrl = URL.createObjectURL(blob);
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        img: blob,
        imageUrl: imageUrl, // Add imageUrl to your state
      }));
    }
  };  

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
              <img
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                }}
                src={formData.img ? formData.img : no_image}
                alt="no_image"
              />

              <label>
                <input type="file" style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
                <img style={{ marginLeft: '34px', cursor: 'pointer', marginTop: '40px' }} src={edit_image} alt="edit_image" />
              </label>
            </div>

            <form onSubmit={(e) => { handleSubmit(e); handleUpdateBackend(); }}>
              <div className="d-flex">
                <div>
                  <input type="text" className='input_profile' placeholder='Имя' name="name" value={formData.name} onChange={handleChange} />
                  {/* <input type="text" className='input_profile' placeholder="Дата рождения" onfocus="(this.type='date')" name="birthDate" value={formData.birthDate} onChange={handleChange} /> */}
                  <InputMask mask='9999.99.99' placeholder="Дата рождения" className='input_profile' value={formData.birthDate} name="birthDate" onChange={handleChange}></InputMask>
                  <InputMask mask='+999 (99) 999-99-99' placeholder="Номер телефона" className='input_profile' value={formData.phoneNumber} name="phoneNumber" onChange={handleChange}></InputMask>
                  {/* <input type="tel" className='input_profile' placeholder='Номер телефона' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /> */}
                </div>

                <div>
                  <input type="text" className='input_profile' placeholder='Фамилия' name="lastName" value={formData.lastName} onChange={handleChange} />
                  <select name="gender" className='input_profile' value={formData.gender} onChange={handleChange}>
                    <option disabled hidden value="">Пол</option>
                    <option value="1" selected={formData.gender === 1}>Мужской</option>
                    <option value="2" selected={formData.gender === 2}>Женский</option>
                  </select>
                  <input type="mail" className='input_profile' placeholder='E-mail' name='email' value={formData.email !== null ? formData.email : ''} onChange={handleChange} />
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