// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import UserProfile from './components/UserProfile';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.get('/api/current_user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching current user:', error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductDisplay />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<UserProfile user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
