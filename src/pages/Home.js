// src/pages/Home.js
import React from 'react';
import './Home.css';
import video from '../assets/background.mp4';

const Home = () => {
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
            <div className="product-card">Product 1</div>
            <div className="product-card">Product 2</div>
            <div className="product-card">Product 3</div>
            {/* Dodajte više proizvoda po potrebi */}
          </div>
        </section>
        <section id="new-products" className="product-section">
          <h2>Novi Proizvodi</h2>
          <div className="product-grid">
            <div className="product-card">Product A</div>
            <div className="product-card">Product B</div>
            <div className="product-card">Product C</div>
            {/* Dodajte više proizvoda po potrebi */}
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
