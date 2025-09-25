import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainLayout from './components/Layout/MainLayout';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
        </Route>

        <Route path='/login' element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
