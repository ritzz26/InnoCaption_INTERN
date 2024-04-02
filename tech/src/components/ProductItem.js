import React from 'react';

const ProductItem = ({ product }) => {
  // Destructure product object
  const { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = product;

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={thumbnail} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Product ID: {id}</p>
          <p className="card-text">Description: {description}</p>
          <p className="card-text">Category: {category}</p>
          <p className="card-text">Price: ${price}</p>
          <p className="card-text">Discount: {discountPercentage}%</p>
          <p className="card-text">rating: {rating}</p>
          <p className="card-text">stock: {stock}</p>
          <p className="card-text">brand: {brand}</p>
          {/* <button className="btn btn-primary">Add to Cart</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
