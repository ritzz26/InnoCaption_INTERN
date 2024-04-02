import './App.css';
import React from 'react';
import ProductList from './components/ProductList';
// import Cart from './components/Cart';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <h1>E-commerce Platform</h1>
      <div className="container">
        {/* <div className="row"> */}
          <div className="col-md-8">
            <ProductList />
          </div>
          {/* <div className="col-md-4"> */}
            {/* <Cart />
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
