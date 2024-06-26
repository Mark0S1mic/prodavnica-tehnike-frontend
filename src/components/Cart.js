import React from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js'; // Uvezi loadStripe funkciju iz Stripe biblioteke

const Cart = ({ cart, removeFromCart, calculateTotal, user }) => {
  // const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };
  
  
  const handleCheckout = async () => {
    const stripe = await loadStripe('pk_test_51PPcXcJDiMSNjr2EV9nwEzVj3HOmREqBd78hDijTLmeLki7PFD6wYLrGOSqs2Woer0V5wyWQC9x1zbvnWWSzEeXT00B2sUPraU');
    const products = cart.map(item => ({
      amount: item.product.cenaProizvoda, // Pretvaranje cene u valutu
      name: item.product.nazivProizvoda, // Prilagođavanje naziva proizvoda
      quantity: item.quantity,
      proizvodId: item.product.proizvodId // Koristite proizvodId
    }));

    const korisnickoImeKupca = user?.korisnickoImeKupca;

    if (!korisnickoImeKupca) {
      console.error('korisnickoImeKupca is not defined');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7073/api/Payments/Checkout', {
        products: products,
        korisnickoImeKupca: korisnickoImeKupca
      });

      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                Shopping Cart
              </MDBTypography>
            </div>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <MDBCard className="rounded-3 mb-4" key={index}>
                  <MDBCardBody className="p-4">
                    <MDBRow className="justify-content-between align-items-center">
                      <MDBCol md="2" lg="2" xl="2">
                       
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3">
                        <p className="lead fw-normal mb-2">{item.product.nazivProizvoda}</p>
                        <p className="text-muted">{item.product.opisProizvoda}</p>
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="2" className="d-flex align-items-center justify-content-around">
                        <MDBInput min={0} defaultValue={item.quantity} type="number" size="sm" readOnly />
                      </MDBCol>
                      <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                        <MDBTypography tag="h5" className="mb-0">
                          {item.product.cenaProizvoda} USD
                        </MDBTypography>
                      </MDBCol>
                      <MDBCol md="1" lg="1" xl="1" className="text-end">
                        <MDBBtn color="danger" onClick={() => handleRemoveFromCart(item.proizvodId)}>
                          Remove
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              ))
            )}
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBTypography tag="h5" className="mb-0">
                  Total: {calculateTotal()} USD
                </MDBTypography>
                <MDBBtn className="mt-3" color="warning" block size="lg" onClick={handleCheckout}>
                  Checkout
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Cart;
