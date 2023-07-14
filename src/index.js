import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './Navbar';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tambahdata from './pages/Tambahdata';
import './index.css'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditPage from './pages/EditPage';
import EditComponent from './component/EditComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes> 
    <Route path='/' element={<App />}/>
      <Route path='/edit/:nim' element={<EditPage />}/>
      <Route path='/daftarmhs' element={<Tambahdata />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/register' element={<RegisterPage />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
