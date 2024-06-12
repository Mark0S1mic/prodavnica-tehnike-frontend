import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentComponent = () => {
  const { nazivProizvoda, cenaProizvoda, userId } = useParams();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    setProductName(nazivProizvoda);
    setProductPrice(Number(cenaProizvoda));
  }, [nazivProizvoda, cenaProizvoda]);

  const handlePayment = async () => {
    try {
      const data = {
        amount: productPrice * 100, // Stripe expects the amount in cents
        productName: productName,
        customerId: userId,
        price: productPrice,
      };

      console.log('Sending data:', data);

      const response = await axios.post('https://localhost:7073/api/Payment/create-checkout-session', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { sessionId } = response.data;

      if (sessionId) {
        // Redirect the user to the checkout page
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
      } else {
        console.error('No sessionId received in the response');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
      }
      // Add logic to display the error to the user
    }
  };

  return (
    <div>
      <h2>{productName}</h2>
      <p>Price: {productPrice} RSD</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentComponent;
