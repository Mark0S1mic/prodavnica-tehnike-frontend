import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12); // Broj proizvoda po stranici
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

    // Paginacija - Izračunavanje indeksa proizvoda za trenutnu stranicu
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Promena stranice
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);
    const lastPage = () => setCurrentPage(Math.ceil(products.length / productsPerPage));

    return (
        <div className="search-results">
            <h2>Search Results</h2>
            <div className="product-grid">
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <ProductCard key={product.proizvodId} product={product} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
            {/* Paginacija */}
            <ul className="pagination">
                <li className="page-item">
                    <button onClick={() => prevPage()} disabled={currentPage === 1} className="page-link">
                        Previous
                    </button>
                </li>
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                    <li key={index} className="page-item">
                        <button onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button onClick={() => nextPage()} disabled={currentPage === Math.ceil(products.length / productsPerPage)} className="page-link">
                        Next
                    </button>
                </li>
                <li className="page-item">
                    <button onClick={() => lastPage()} className="page-link">
                        Last
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SearchResults;
