import { Route, Routes } from 'react-router-dom';
import './App.css';

// Главные страница
import HomePage from './pages/home';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;