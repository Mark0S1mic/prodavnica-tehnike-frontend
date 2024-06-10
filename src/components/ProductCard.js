import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.proizvodId}`}>
        <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.nazivProizvoda} />
        <h3>{product.nazivProizvoda}</h3>
        <p>{product.cenaProizvoda} RSD</p>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    proizvodId: PropTypes.number,
    imageUrl: PropTypes.string,
    nazivProizvoda: PropTypes.string.isRequired,
    cenaProizvoda: PropTypes.number.isRequired
  }).isRequired
};

export default ProductCard;
