import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsDropdown from './ProductsDropdown/ProductsDropdown';
import './Navbar.css';

const Navbar = ({ user, onLogout, cart, updateCart }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchQuery}`);
    };

    const handleLogoutClick = () => {
        onLogout();
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Bits and Bytes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <ProductsDropdown />
                        </li>
                        <li className="nav-item">
                            <form className="d-flex" onSubmit={handleSearchSubmit}>
                                <input
                                    className="form-control me-2"
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </li>
                        {user ? (
                            <>
                                
                                <li className="nav-item">
                                    <button className="nav-link btn" onClick={handleLogoutClick}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="fas fa-shopping-cart"></i> Cart ({cart.length})
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
