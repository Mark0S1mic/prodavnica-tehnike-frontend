import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchSearchResults = async () => {
            const queryParams = new URLSearchParams(location.search);
            const query = queryParams.get('q');
            try {
                const response = await axios.get('https://localhost:7073/api/proizvod');
                const filteredProducts = response.data.filter(product => 
                    product.nazivProizvoda.toLowerCase().includes(query.toLowerCase())
                );
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [location.search]);

    return (
        <div className="search-results">
            <h2>Search Results</h2>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.proizvodId} product={product} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
