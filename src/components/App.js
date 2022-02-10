import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../css/new.css';
import HeaderAdmin from './Header/HeaderAdmin';
import Footer from './Footer/Footer';
import LoginForm from './LoginForm';

const App = () => {
  return (
    <div className="App">
      <HeaderAdmin/>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
