import './App.css';
import { useState } from 'react'
import PetHotels from '../PetHotels/PetHotels';
import PetResturants from '../PetResturants/PetResturants';
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <main className="App">
      <Routes>
        <Route path='/petHotels' element={<PetHotels />} />
        <Route path='/petResturants' element={<PetResturants />} />
      </Routes>
    </main>
  );
}

export default App;
