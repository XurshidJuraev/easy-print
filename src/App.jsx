import { Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/basket' element={<Basket />} />

        <Route path='/orders' element={<MyOrders />} />

        <Route path='/yourDesign' element={<YourDesign />} />

        <Route path='*' element={<Error404 />} />

        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/addres' element={<ProfileAddres />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='/profile/payment' element={<ProfilePayment />} />
      </Routes>
    </div>
  );
}

export default App;