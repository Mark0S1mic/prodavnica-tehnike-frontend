import axios from 'axios';

const BASE_URL = 'https://localhost:7073/api'; // Promenite ovo prema stvarnom URL-u backend servera

const StripeService = {
  createCheckoutSession: async (amount, productName, customerId, price) => {
    try {
      const response = await axios.post(`${BASE_URL}/Payments/create-checkout-session`, {
        amount,
        productName,
        customerId,
        price
      });
      return response.data;
    } catch (error) {
      throw new Error('Error creating checkout session: ' + error.message);
    }
  }
};

export default StripeService;
