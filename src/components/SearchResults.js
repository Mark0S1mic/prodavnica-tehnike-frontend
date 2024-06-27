import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import './SearchResults.css'; // Importujemo CSS za stilizaciju

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12); // Broj proizvoda po stranici
    const [sortBy, setSortBy] = useState({ field: 'name', order: 'asc' }); // State za sortiranje
    const location = useLocation();

    useEffect(() => {
        const fetchSearchResults = async () => {
            const queryParams = new URLSearchParams(location.search);
            const query = queryParams.get('q');
            try {
                const response = await axios.get('https://localhost:7073/api/proizvod');
                let filteredProducts = response.data.filter(product =>
                    product.nazivProizvoda.toLowerCase().includes(query.toLowerCase())
                );

                // Sortiranje rezultata prema izabranoj opciji
                if (sortBy.field === 'name') {
                    filteredProducts.sort((a, b) => {
                        if (sortBy.order === 'asc') {
                            return a.nazivProizvoda.localeCompare(b.nazivProizvoda);
                        } else {
                            return b.nazivProizvoda.localeCompare(a.nazivProizvoda);
                        }
                    });
                } else if (sortBy.field === 'price') {
                    filteredProducts.sort((a, b) => {
                        if (sortBy.order === 'asc') {
                            return a.cenaProizvoda - b.cenaProizvoda;
                        } else {
                            return b.cenaProizvoda - a.cenaProizvoda;
                        }
                    });
                }

                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [location.search, sortBy]);

    // Paginacija - Izračunavanje indeksa proizvoda za trenutnu stranicu
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Promena stranice
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);
    const lastPage = () => setCurrentPage(Math.ceil(products.length / productsPerPage));

    // Promena načina sortiranja
    const handleSortChange = (field) => {
        if (sortBy.field === field) {
            // Ako je već sortirano po ovom polju, promeni smer
            setSortBy(prevSort => ({
                ...prevSort,
                order: prevSort.order === 'asc' ? 'desc' : 'asc'
            }));
        } else {
            // Ako je odabrano novo polje za sortiranje, počni sa asc smerom
            setSortBy({ field, order: 'asc' });
        }
    };

    return (
        <div className="search-results">
            <h2 className="center">Search Results</h2>
            <div className="sort-section">
                <button onClick={() => handleSortChange('name')} className={`sort-button ${sortBy.field === 'name' ? sortBy.order === 'asc' ? 'active-asc' : 'active-desc' : ''}`}>
                    Sort by Name {sortBy.field === 'name' && `(${sortBy.order === 'asc' ? 'asc' : 'desc'})`}
                </button>
                <button onClick={() => handleSortChange('price')} className={`sort-button ${sortBy.field === 'price' ? sortBy.order === 'asc' ? 'active-asc' : 'active-desc' : ''}`}>
                    Sort by Price {sortBy.field === 'price' && `(${sortBy.order === 'asc' ? 'asc' : 'desc'})`}
                </button>
            </div>
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
