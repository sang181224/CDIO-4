import './App.css';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
