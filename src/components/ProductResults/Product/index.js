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
    author, 
    pos
  } = product;

    if(!documentID || !productThumbnail || !productName || typeof(productPrice) === 'undefined') return null;

    const configAddToCartButton = {
        type: 'button',
        className: 'addToCart'
    }

    const handleAddToCart = product => {
      if(!product) return;
      dispatch(
        addProduct(product)
      );
      navigate('/cart')
    };

    return (
      <div className="productCard">
        <div className="cardImg">
          <Link to={`/product/${documentID}`}>
            <img src={productThumbnail} alt={productName} />
          </Link>
        </div>
        <div className="cardBody">
          <div className="cardHeader">
            <Link to={`/product/${documentID}`}>
            <h1 className="title">{productName}</h1>
            </Link>
            <h2 className="author">{author}</h2>
          </div>
          <div className="priceWrap">
            <h2 className="priceTag">
              <span className="symbol">KES </span>
              <span className="price">{ productPrice }</span>
            </h2>
          </div>
        </div>
        <div className="actionBtn">
          <Button 
                {...configAddToCartButton}
                onClick={() => handleAddToCart(product)}
                >
                  ADD TO CART
          </Button>
        </div>

      </div>
    );
}

export default Product;