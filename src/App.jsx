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

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/basket' element={<Basket />} />

        <Route path='/orders' element={<MyOrders />} />

        <Route path='/yourDesign' element={<YourDesign />} />
      </Routes>
    </div>
  );
}

export default App;