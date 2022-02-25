import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import { addProduct } from "../../redux/Cart/cart.actions";
import Button from "./../forms/Button";
import "./styles.scss";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector(mapState);
  const { productID } = useParams();

  const { productThumbnail, productName, productPrice, productDesc } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const configAddtoCartBtn = {
    type: "button",
    className: "btn",
  };

  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
    navigate("/cart");
  };

  return (
    <div className="productCard">
      <div class="cardLogo">
        <div class="prodImg">
          <img src={productThumbnail} />
        </div>
      </div>
      <div class="wrap">
        <div class="cardContent">
          <div class="cardTitle">
            <h1 class="title">{productName}</h1>
            <h2 class="year">Class 1</h2>
            <h2 class="price">
              <span class="symbol">KES </span>
              <span class="amount">{productPrice}</span>
            </h2>
          </div>
          <div class="cardDesc">
            <h2 class="descHeader">Description</h2>
            <p class="descText">
              {productDesc ? (
                <span dangerouslySetInnerHTML={{ __html: productDesc }} />
              ) : (
                <p>Talk to use for more information about the book</p>
              )}
            </p>
          </div>
        </div>
        <div class="addToCart">
          <Button
            {...configAddtoCartBtn}
            onClick={() => handleAddToCart(product)}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
