import React, { useState, useEffect } from 'react';
import './ProductList.css'; 
import SearchBar from './SearchBar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  // const histostory();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [productadd, setproductAdd] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
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

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleSearch = async () => {
    try {
      let string = 'https://dummyjson.com/products/search?q='+searchQuery;
      const response = await fetch(string, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // const addclick = (event) => {
  //   setproductAdd(event.target.value);
  // };

  const HandleADD = async (product) => {
    setShowPopup(true);
    try {
      let string = 'https://dummyjson.com/carts/add';
      const response = await fetch(string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId:1,
          products: [
            {
              id: product.id,
              quantity: quantity,
            }
          ]
        })
      });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false); 
      }, 500);
      setQuantity(1);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleRedirect = () => {
    navigate('/cart'); 
  };

  return (
    <div className="container">
      <div className='navbar' style={{ backgroundColor: 'grey', padding: '2px', marginBottom: '20px', display: 'flex'}}>
        <h1 className="mt-4 mb-4 text-white" style={{paddingLeft:'20px'}}>Rit's Ecommerce Platform</h1>
        <div style={{paddingLeft: '25%', paddingTop: '23px'}}>
        <SearchBar 
          value={searchQuery} 
          onChange={handleSearchInputChange} 
          onSearch={handleSearch} 
        />
        </div>
        <div style={{paddingLeft: '35%', paddingTop: '23px'}}>
        <button className="btn btn-primary" onClick={handleRedirect}><FontAwesomeIcon icon={faShoppingBasket} size="2x"/></button>
        </div>
      </div>
      {showPopup && (
        <div className="popup" style={{marginLeft: '40%'}}>
          <div className="popup-content">
            <p>Product added to cart!</p>
          </div>
        </div>
      )}
      {!showPopup && (<div className="row">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card" style={{marginTop:'15px'}}>
              <img src={product.thumbnail} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">From {product.brand}</p>
                <p className="card-description">{product.description}</p>
                <p className="card-price">Price: ${product.price}</p>
                <p className="card-rating">Rating: {product.rating}/5</p>
                <br></br>
              </div>
              <div style={{float: 'right', marginBottom: '2px', marginTop: '2px', marginRight: '25px'}}>
              <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
              <button onClick={() => HandleADD(product) }>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>)}
    </div>
  );
};

export default ProductList;
