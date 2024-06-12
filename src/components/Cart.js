import React from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, removeFromCart, calculateTotal, user }) => {
  const navigate = useNavigate();
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (user) {
      // Assuming there's only one item in the cart for simplicity
      if (cart.length > 0) {
        const item = cart[0]; // get the first item from the cart
        const { nazivProizvoda, cenaProizvoda } = item.product;
        navigate(`/checkout/${nazivProizvoda}/${cenaProizvoda}/${user.id}`);
      }
    } else {
      alert('Morate biti prijavljeni da biste nastavili sa procesom plaćanja.');
      // Redirect or display a login modal
      // Implement your navigation or modal logic here
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
              <p>Vaša korpa je prazna.</p>
            ) : (
              cart.map((item, index) => (
                <MDBCard className="rounded-3 mb-4" key={index}>
                  <MDBCardBody className="p-4">
                    <MDBRow className="justify-content-between align-items-center">
                      <MDBCol md="2" lg="2" xl="2">
                        <MDBCardImage className="rounded-3" fluid src={item.product.image} alt={item.product.nazivProizvoda} />
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3">
                        <p className="lead fw-normal mb-2">{item.product.nazivProizvoda}</p>
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="2" className="d-flex align-items-center justify-content-around">
                        <MDBInput min={0} defaultValue={item.quantity} type="number" size="sm" readOnly />
                      </MDBCol>
                      <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                        <MDBTypography tag="h5" className="mb-0">
                          {item.product.cenaProizvoda} RSD
                        </MDBTypography>
                      </MDBCol>
                      <MDBCol md="1" lg="1" xl="1" className="text-end">
                        <MDBBtn color="danger" onClick={() => handleRemoveFromCart(item.product.id)}>
                          Ukloni
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
                  Total: {calculateTotal()} RSD
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
