import React, { useState, useEffect } from 'react';
// import './ProductList.css'; 
import SearchBar from './SearchBar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { redirect, redirectDocument } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // const histostory();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [productadd, setproductAdd] = useState([]);
  
  const [quantity, setQuantity] = useState(1);
  
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup_add, setShowPopup_add] = useState(false);

  const filteredProducts_cart = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/carts/user/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data)
      console.log('Fetched products:', data['carts'][0]['products']);
      setProducts(data['carts'][0]["products"]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const HandleRemove = async (product) => {
    try {
      let string = 'https://dummyjson.com/carts/1/';
      const response = await fetch(string, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            merge: true,
          products: [
            {
                id: product.id,
                quantity: product.quantity-1
            }
          ],
        })
      });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false); 
      }, 500);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleedit = async(product) => {
    try {
        let string = 'https://dummyjson.com/carts/1/';
        const response = await fetch(string, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              merge: true,
            products: [
              {
                  id: product.id,
                  quantity: quantity
              }
            ],
          })
        });
        setShowPopup_add(true);
        setTimeout(() => {
          setShowPopup_add(false); 
        }, 500);
        setQuantity(1);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
  };

  // const addclick = (event) => {
  //   setproductAdd(event.target.value);
  // };

  const handleRedirect = () => {
    navigate('/'); 
  };

  return (
    <div className="container">
      <div className='navbar' style={{ backgroundColor: 'grey', padding: '2px', marginBottom: '20px', display: 'flex'}}>
        <h1 className="mt-4 mb-4 text-white" style={{paddingLeft:'20px'}}>Rit's Ecommerce Platform</h1>
        <div style={{paddingLeft: '70%', paddingTop: '27px'}}>
        <button className="btn btn-primary" onClick={handleRedirect}><FontAwesomeIcon icon={faHome} size="2x"/></button>
        </div>
      </div>
      {showPopup && (
        <div className="popup" style={{marginLeft: '40%'}}>
          <div className="popup-content">
            <p>Product removed from cart!</p>
          </div>
        </div>
      )}
      {showPopup_add && (
        <div className="popup" style={{marginLeft: '40%'}}>
          <div className="popup-content">
            <p>Product quantity changed!</p>
          </div>
        </div>
      )}
      {!showPopup && !showPopup_add && (<div className="row">
        {filteredProducts_cart.map(product => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card" style={{marginTop:'15px'}}>
              <img src={product.thumbnail} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-price">Price: ${product.price}</p>
                <p className="card-quantity">Quantity {product.quantity}</p>
                <button onClick={() => HandleRemove(product)}>Remove</button>
                <button onClick={()=>handleedit(product)}>Edit To</button>
                <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
              </div>
            </div>
          </div>
        ))}
      </div>)}
    </div>
  );
};

export default Cart;
