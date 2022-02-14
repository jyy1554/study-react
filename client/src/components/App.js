import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../css/new.css';
import HeaderAdmin from './Header/HeaderAdmin';
import Footer from './Footer/Footer';
import LoginForm from './LoginForm';
import ReactProxy from './R109_reactProxy';
import ApiGetJson from './R110_ApiGetJson';

const App = () => {
  return (
    <div className="App">
      <HeaderAdmin/>
      <Routes>
        <Route path="/" exact element={<LoginForm />} />
        <Route path='/reactProxy' exact element={<ReactProxy />} />
        <Route path='/ApiGetJson' exact element={<ApiGetJson />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
