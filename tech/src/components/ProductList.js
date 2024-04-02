import React, { useState, useEffect } from 'react';
import './ProductList.css'; 
import SearchBar from './SearchBar'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Fetched products:', data["products"]);
      
      setProducts(data["products"]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async() => {
    try {
      let string = 'https://dummyjson.com/products/search?q='+searchQuery;
      const response = await fetch(string, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('Fetched products:', data["products"]);
      setProducts(data["products"]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }

  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Products</h2>
      <SearchBar 
        value={searchQuery} 
        onChange={handleSearchInputChange} 
        onSearch={handleSearch} 
      />
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card">
              <img src={product.thumbnail} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">From {product.brand}</p>
                <p className="card-description">{product.description}</p>
                {/* <p className="card-text">Category: {product.category}</p> */}
                <p className="card-text">Price: ${product.price}</p>
                {/* <p className="card-text">Discount: {product.discountPercentage}%</p> */}
                <p className="card-text">Rating: {product.rating}/5</p>
                {/* <p className="card-text">Stock: {product.stock}</p> */}
                {/* <button className="btn btn-primary">Add to Cart</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
