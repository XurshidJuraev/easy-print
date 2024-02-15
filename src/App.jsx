import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Главные страница
import HomePage from './pages/home';
// Корзина страниция 
import Basket from './pages/basket';
// Мои заказы страниция 
import MyOrders from './pages/orders';
// Изменить футболки страниция 
import YourDesign from './pages/your design';
// 404 Не Найдено
import Error404 from './pages/404/index';
// Страница профиля
import Profile from './pages/profile';
import ProfileAddres from './pages/profile/addres';
import ProfileOrders from './pages/profile/orders';
import ProfilePayment from './pages/profile/pay';
// Показать детальный продукт
import ShowDetail from './pages/show';
// Страница категорий
import CategoryListByName from './pages/categories';
// Автор
import AuthorPage from './pages/author';
// Футeр страниция 
// -- Доставка
import FooterDeliveryPage from './pages/footer page/information/delivery';
// -- Оплата
import FooterPayPage from './pages/footer page/information/pay';
// -- Обмен и возврат
import FooterExchangePage from './pages/footer page/information/exchange';
// -- Oформить заказ?
import FooterOrderPage from './pages/footer page/information/order';
// -- Пользвательское соглашение
import FooterTermsPage from './pages/footer page/information/terms';

import HomePageMobile from './mobile/pages/home';

function App() {
  const navigate = useNavigate();
  const screenWidth = window.screen.width;

  if (screenWidth < 600) {
    navigate('/mobile');
  }

  return (
    <div>
      <center style={{textAlign: 'left'}}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/mobile' element={<HomePageMobile />} />
          <Route path='/basket' element={<Basket />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/yourDesign' element={<YourDesign />} />
          <Route path="/show/detail/:id/:name" element={<ShowDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/addres' element={<ProfileAddres />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='/profile/payment' element={<ProfilePayment />} />
          <Route path='/categories/:id/:name' element={<CategoryListByName />} />
          <Route path='/author/:id/:name' element={<AuthorPage />} />
          <Route path='/footer/delivery' element={<FooterDeliveryPage />} />
          <Route path='/footer/pay' element={<FooterPayPage />} />
          <Route path='/footer/exchange' element={<FooterExchangePage />} />
          <Route path='/footer/order' element={<FooterOrderPage />} />
          <Route path='/footer/terms' element={<FooterTermsPage />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </center>
    </div>
  );
}

export default App;