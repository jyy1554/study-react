import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../css/new.css';
import HeaderAdmin from './Header/HeaderAdmin';
import Footer from './Footer/Footer';
import LoginForm from './LoginForm';
import FloatingPopulationList from './Floating_population/floatingPopulationList';

const App = () => {
  return (
    <div className="App">
      <HeaderAdmin/>
      <Routes>
        <Route path="/" exact element={<LoginForm />} />
        <Route path='/floatPopulationList' exact element={<FloatingPopulationList />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
