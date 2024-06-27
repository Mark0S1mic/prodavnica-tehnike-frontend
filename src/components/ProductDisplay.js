import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import ProductCard from './ProductCard'; // Import the ProductCard component
import './ProductDisplay.css';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState({ field: 'price', order: 'asc' }); // State to track sorting field and order
  const productsPerPage = 12;
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7073/api/proizvod');
        console.log(response.data); // Log all products to see what is returned
        const filteredProducts = response.data.filter(product => {
          const productCategory = product.tipProizvoda.toLowerCase().replace(/\s+/g, '-');
          return productCategory.includes(category.toLowerCase());
        });
        // Sort filtered products based on current sorting criteria
        const sortedProducts = sortProducts(filteredProducts, sortBy);

        setProducts(sortedProducts);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category, sortBy]);

  const sortProducts = (products, sort) => {
    const { field, order } = sort;
    if (field === 'price') {
      return order === 'asc'
        ? products.sort((a, b) => a.cenaProizvoda - b.cenaProizvoda)
        : products.sort((a, b) => b.cenaProizvoda - a.cenaProizvoda);
    } else if (field === 'name') {
      return order === 'asc'
        ? products.sort((a, b) => a.nazivProizvoda.localeCompare(b.nazivProizvoda))
        : products.sort((a, b) => b.nazivProizvoda.localeCompare(a.nazivProizvoda));
    }
    return products;
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSortChange = (field) => {
    // Toggle sorting order or change sorting field
    if (sortBy.field === field) {
      const newSortOrder = sortBy.order === 'asc' ? 'desc' : 'asc';
      setSortBy({ field, order: newSortOrder });
    } else {
      setSortBy({ field, order: 'asc' });
    }
  };

  const displayProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <div className="product-display">
      <div className="sort-section">
        <button onClick={() => handleSortChange('price')} className={`sort-button ${sortBy.field === 'price' ? 'active' : ''}`}>
          Sort by Price {sortBy.field === 'price' && (sortBy.order === 'asc' ? '▲' : '▼')}
        </button>
        <button onClick={() => handleSortChange('name')} className={`sort-button ${sortBy.field === 'name' ? 'active' : ''}`}>
          Sort by Name {sortBy.field === 'name' && (sortBy.order === 'asc' ? '▲' : '▼')}
        </button>
      </div>
      <div className="product-grid">
        {displayProducts.map((product, index) => (
          <ProductCard key={product.nazivProizvoda} product={product} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(products.length / productsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default ProductDisplay;
