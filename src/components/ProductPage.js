import React from 'react';
import PaymentForm from './PaymentForm';

const ProductPage = () => {
  return (
    <div>
      <h2>Proizvod</h2>
      <PaymentForm amount={1000} productName="Naziv proizvoda" />
    </div>
  );
};

export default ProductPage;
