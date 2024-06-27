import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductDisplay from './components/ProductDisplay';
import ProductDetail from './components/ProductDetail';
import SearchResults from './components/SearchResults';
import Cart from './components/Cart';
import PaymentComponent from './components/PaymentComponent';
import Success from './components/Success';
import Cancel from './components/Cancel';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const userData = localStorage.getItem('userData');
    const storedCart = localStorage.getItem('cart');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleLogin = (userData) => {
    console.log('Korisnik prijavljen:', userData);
    localStorage.setItem('jwtToken', userData.token); // Assuming userData contains a token property
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
    setUser(null);
    clearCart();
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      } else {
        const newItem = { product: { ...product }, quantity };
        const newCart = [...prevCart, newItem];
        saveCartToLocalStorage(newCart);
        return newCart;
      }
    });
  };

  const saveCartToLocalStorage = (cart) => {
    try {
      const cartJSON = JSON.stringify(cart);
      localStorage.setItem('cart', cartJSON);
      console.log('Korpa uspešno sačuvana u localStorage.');
    } catch (error) {
      console.error('Greška prilikom upisa korpe u localStorage:', error);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const indexToRemove = prevCart.findIndex(item => item.product.id === productId);
      if (indexToRemove === -1) {
        console.error('Proizvod sa datim ID-jem nije pronađen u korpi.');
        return prevCart;
      }
      const updatedCart = [...prevCart];
      updatedCart.splice(indexToRemove, 1);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.cenaProizvoda * item.quantity, 0);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductDisplay />} />
        <Route path="/product/:productId" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login setUser={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} calculateTotal={calculateTotal} user={user} />} />
        <Route path="/checkout/:nazivProizvoda/:cenaProizvoda/:userId" element={<PaymentComponent />} />
        <Route path="/success" element={<Success />} />  
        <Route path="/cancel" element={<Cancel />} /> 
        {user ? (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
