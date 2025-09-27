import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/AuthPage/LoginPage';
import MainLayout from './components/Layout/MainLayout';
import Register from './pages/AuthPage/RegisterPage';
import { AuthProvider } from './contexts/AuthContext';
import DetailPage from './pages/DetailPage/DetailPage';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/artwork' element={<DetailPage />} />

          </Route>

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
