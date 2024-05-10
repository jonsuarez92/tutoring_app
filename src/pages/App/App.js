import './App.css';
import { useState } from 'react'
import Signup from '../../components/signup/Signup';
import Login from '../../components/Login/Login';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';
import HomePage from '../HomePage/HomePage';
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <main className="App">
      <Routes>
        <Route path='/Home' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/FogotPassword' element={<ForgotPassword />} />
      </Routes>
    </main>
  );
}

export default App;
