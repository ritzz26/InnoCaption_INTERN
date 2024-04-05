import './App.css';
import ReactDOM from "react-dom/client";
import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import SearchBar from './components/SearchBar';
import Login from './components/Login';
import Signup from './components/signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<ProductList />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
