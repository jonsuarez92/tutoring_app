import './App.css';
import { useState } from 'react'
import PetHotels from '../PetHotels/PetHotels';
import PetRestaurants from '../PetRestaurants/PetRestaurants';
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <main className="App">
      <Routes>
        <Route path='/petHotels' element={<PetHotels />} />
        <Route path='/petRestaurants' element={<PetRestaurants />} />
      </Routes>
    </main>
  );
}

export default App;
