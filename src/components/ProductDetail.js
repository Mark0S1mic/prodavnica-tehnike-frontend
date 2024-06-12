import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
 // MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Promenjeno da bi se količina pratila u stanju

  

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7073/api/proizvod/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const getProductImage = (proizvodId) => {
    try {
      return require(`../assets/images/product${proizvodId}.jpg`);
    } catch (err) {
      return 'https://via.placeholder.com/150';
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <MDBContainer fluid className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-overlay"
            >
           <MDBCardBody className="pb-0">
  <div style={{ maxHeight: "50vh", overflow: "hidden" }}> {/* Postavljanje maksimalne visine slike i skrivanje preostalog dela */}
    <img
      src={getProductImage(productId)}
      alt={product.nazivProizvoda}
      style={{
        width: "100%",
        height: "auto", // Osigurava da se slika proporcionalno smanjuje
        objectFit: "contain", // Smanjuje sliku da stane unutar okvira
      }}
    />
  </div>
  <a href="#!">
    <div className="mask"></div>
  </a>
</MDBCardBody>
              <a href="#!">
                <div className="mask"></div>
              </a>
            </MDBRipple>
            <MDBCardBody className="pb-0 text-center"> {/* Dodata klasa text-center */}
              <div>
                <p className="h5">
                  {product.nazivProizvoda}
                </p>
                <p className="small text-muted">{product.opisProizvoda}</p>
              </div>
              <div>
                <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                  {[...Array(5)].map((_, index) => (
                    <MDBIcon key={index} fas icon="star" />
                  ))}
                </div>
              </div>
            </MDBCardBody>
            <hr className="my-0" />
            <MDBCardBody className="pb-0 text-center"> {/* Dodata klasa text-center */}
              <div>
                <p>
                  Cena: {product.cenaProizvoda} RSD
                </p>
              </div>
            </MDBCardBody>
            <hr className="my-0" />
            <MDBCardBody className="pb-0">
  <div className="d-flex justify-content-between align-items-center pb-2 mb-4">
    <div>
      <label htmlFor="quantityInput">Izaberi količinu:</label>
      <input
         type="number"
        min="1"
        max={product.kolicina}
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
    </div>
    <div>
      <MDBBtn color="primary" onClick={handleAddToCart}>Add to Cart</MDBBtn>
    </div>
    <div>
      <MDBBtn color='danger' onClick={() => window.history.back()}>Cancel</MDBBtn> {/* Dodato dugme za cancel */}
    </div>
  </div>
</MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
  
};

export default ProductDetail;
