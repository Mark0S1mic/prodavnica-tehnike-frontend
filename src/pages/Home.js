import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import video from '../assets/background.mp4';

const Home = () => {
  // Example product data
  const popularProducts = [
    { id: 1041, name: 'Xiaomi Mi 11', image: require('../assets/images/product1041.jpg') },
    { id: 1023, name: 'Samsung QLED TV', image: require('../assets/images/product1023.jpg') },
    { id: 1048, name: 'ASUS ROG Phone 5', image: require('../assets/images/product1048.jpg') },
    // Add more products as needed
  ];

  const newProducts = [
    { id: 1076, name: 'Gigabyte Aorus 15G', image: require('../assets/images/product1076.jpg') },
    { id: 1016, name: 'Phillips Fen za Kosu', image: require('../assets/images/product1016.jpg') },
    { id: 1079, name: 'LG Gram 17', image: require('../assets/images/product1079.jpg') }
    // Add more products as needed
  ];

  return (
    <div className="home-container">
      <div className="video-background">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div className="video-overlay">
          <h1>Welcome to Bits and Bytes</h1>
          <p>Your one-stop shop for all your needs</p>
        </div>
      </div>
      <div className="content-section">
        <section id="popular-products" className="product-section">
          <h2>Najpopularniji Proizvodi</h2>
          <div className="product-grid">
            {popularProducts.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section id="new-products" className="product-section">
          <h2>Novi Proizvodi</h2>
          <div className="product-grid">
            {newProducts.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <h2>Kontakt Informacije</h2>
          <p>Možete nas kontaktirati putem telefona ili e-pošte.</p>
          <ul>
            <li>Telefon: +381 123 4567</li>
            <li>Email: info@myshop.com</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
