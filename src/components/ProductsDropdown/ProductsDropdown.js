import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductsDropdown = () => {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    

    return (
        <Dropdown show={show} onMouseEnter={toggleShow} onMouseLeave={toggleShow}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Products
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/products/bela-tehnika">Bela tehnika</Dropdown.Item>
                <Dropdown.Item as={Link} to="/products/tv">TV</Dropdown.Item>
                <Dropdown.Item as={Link} to="/products/telefoni">Telefoni</Dropdown.Item>
                <Dropdown.Item as={Link} to="/products/kompjuteri">Kompjuteri</Dropdown.Item>
                <Dropdown.Item as={Link} to="/products/laptop">Laptop</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProductsDropdown;
