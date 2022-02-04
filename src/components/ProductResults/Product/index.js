import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../../../redux/Cart/cart.actions";
import Button from "./../../forms/Button";

const Product = (product) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
    documentID,
    productThumbnail,
    productName, 
    productPrice, 
    pos 
  } = product;

    if(!documentID || !productThumbnail || !productName || typeof(productPrice) === 'undefined') return null;

    const configAddToCartButton = {
        type: 'button'
    }

    const handleAddToCart = product => {
      if(!product) return;
      dispatch(
        addProduct(product)
      );
      navigate('/cart')
    };

    return (
      <div className="product">
        <div className="thumb">
          <Link to={`/product/${documentID}`}>
            <img src={productThumbnail} alt={productName} />
          </Link>
        </div>
        <div className="details">
          <ul>
            <li key={`dn${pos}`}>
              <span className="name">
                <Link to={`/product/${documentID}`}>
                  {productName}
                </Link>
              </span>
            </li>
            <li key={`dp${pos}`}>
              <span className="price">KES {productPrice}</span>
            </li>
            <li key={`db${pos}`}>
              <div className="addToCart">
                <Button 
                {...configAddToCartButton}
                onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
}

export default Product;