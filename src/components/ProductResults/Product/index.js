import React from "react";
import Button from "./../../forms/Button";

const Product = ({ productThumbnail, productName, productPrice, pos }) => {
    if(!productThumbnail || !productName || typeof(productPrice) === 'undefined') return null;

    const configAddToCartButton = {
        type: 'button'
    }

    return (
      <div className="product">
        <div className="thumb">
          <img src={productThumbnail} alt={productName} />
        </div>
        <div className="details">
          <ul>
            <li key={`dn${pos}`}>
              <span className="name">{productName}</span>
            </li>
            <li key={`dp${pos}`}>
              <span className="price">KES {productPrice}</span>
            </li>
            <li key={`db${pos}`}>
              <div className="addToCart">
                <Button {...configAddToCartButton}>Add to Cart</Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
}

export default Product;