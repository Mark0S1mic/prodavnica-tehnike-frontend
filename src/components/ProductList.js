// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7073/api/proizvod');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.proizvodId}>
            <h2>{product.nazivProizvoda}</h2>
            <p>{product.opisProizvoda}</p>
            <p>Price: {product.cenaProizvoda}</p>
            <p>Quantity: {product.kolicina}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
