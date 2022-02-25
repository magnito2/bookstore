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
        <div class="cardImg">
          <Link to={`/product/${documentID}`}>
            <img src={productThumbnail} alt={productName} />
          </Link>
        </div>
        <div class="cardBody">
          <div class="cardHeader">
            <Link to={`/product/${documentID}`}>
            <h1 class="title">{productName}</h1>
            </Link>
            <h2 class="author">{author}</h2>
          </div>
          <div class="priceWrap">
            <h2 class="priceTag">
              <span class="symbol">KES </span>
              <span class="price">{ productPrice }</span>
            </h2>
          </div>
        </div>
        <div class="actionBtn">
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