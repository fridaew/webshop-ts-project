import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Products from './pages/Products'
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/CartContext';

const App = () => {

return (
    <CartProvider>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/products/:id" element={<ProductDetails/>} />
      </Routes>
    </div>
    </CartProvider>

  );
}

export default App;






