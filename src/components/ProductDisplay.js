import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import ProductCard from './ProductCard'; // Import the ProductCard component
import './ProductDisplay.css';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7073/api/proizvod');
        console.log(response.data); // Loguj sve proizvode da vidiš šta se vraća
        const filteredProducts = response.data.filter(product => {
            const productCategory = product.tipProizvoda.toLowerCase().replace(/\s+/g, '-');
            return productCategory.includes(category.toLowerCase());
          });
        setProducts(filteredProducts);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const displayProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <div className="product-display">
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
