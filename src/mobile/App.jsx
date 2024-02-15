import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import usePreventZoom from './components/zoom';

function App() {

  usePreventZoom();
  return (
    <div>
      <center style={{textAlign: 'left'}}>
        <Routes>
          <Route path='/mobile' element={<HomePage />} />

          <Route path='/mobile/basket' element={<Basket />} />

          <Route path='/mobile/orders' element={<MyOrders />} />

          <Route path='/mobile/yourDesign' element={<YourDesign />} />

          <Route path="/show/detail/:id/:name" element={<ShowDetail />} />

          <Route path='/mobile/profile' element={<Profile />} />
          <Route path='/mobile/profile/addres' element={<ProfileAddres />} />
          <Route path='/mobile/profile/orders' element={<ProfileOrders />} />
          <Route path='/mobile/profile/payment' element={<ProfilePayment />} />

          <Route path='/mobile/categories/:id/:name' element={<CategoryListByName />} />

          <Route path='/mobile/author/:id/:name' element={<AuthorPage />} />

          <Route path='/mobile/footer/delivery' element={<FooterDeliveryPage />} />

          <Route path='/mobile/footer/pay' element={<FooterPayPage />} />

          <Route path='/mobile/footer/exchange' element={<FooterExchangePage />} />

          <Route path='/mobile/footer/order' element={<FooterOrderPage />} />

          <Route path='/mobile/footer/terms' element={<FooterTermsPage />} />

          <Route path='*' element={<Error404 />} />
        </Routes>
      </center>
    </div>
  );
}

export default App;