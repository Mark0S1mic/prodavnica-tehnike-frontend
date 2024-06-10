import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDisplay from './ProductDisplay';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('hhttps://localhost:7073/api/proizvod');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductDisplay products={products} />
      )}
    </div>
  );
};

export default ProductsPage;
