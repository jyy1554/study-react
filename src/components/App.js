import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../css/new.css';
import HeaderAdmin from './Header/HeaderAdmin';
import Footer from './Footer/Footer';
import LoginForm from './LoginForm';
import FloatingPopulationList from './Floating_population/floatingPopulationList';
import RechartsSimpleLineChart from './Floating_population/rechartsSimpleLineChart';
import FloatingPopulationListChart from './Floating_population/floatingPopulationListChart';

const App = () => {
  return (
    <div className="App">
      <HeaderAdmin/>
      <Routes>
        <Route path="/" exact element={<LoginForm />} />
        <Route path='/floatPopulationList' exact element={<FloatingPopulationList />} />
        <Route path='/rechartsSimpleLineChart' exact element={<RechartsSimpleLineChart />} />
        <Route path='/floatingPopulationListChart' exact element={<FloatingPopulationListChart />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
