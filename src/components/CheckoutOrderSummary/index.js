import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { selectCartItems, selectCartTotal, selectTotalCost, selectShippingCost} from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import Button from "../forms/Button";

import './styles.scss';

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal : selectCartTotal,
    totalCost : selectTotalCost,
    shippingCost : selectShippingCost
})

const CheckoutOrderSummary = ({}) => {

    const { cartItems, cartTotal, totalCost, shippingCost } = useSelector(mapState);

    return (
      <div className="orderSummary checkOutItem">
        <div className="title">
          <h1>ORDER SUMMARY</h1>
        </div>
        <div className="itemList">
          <div className="subTitle">
            <h2>
              ITEMS{" "}
              <span className="shoppingIcon">
                <FontAwesomeIcon icon={faBasketShopping} />
              </span>
            </h2>
            <hr />
          </div>
          <div className="items">
            <ul>
              {cartItems.map((item, idx) => (
                <li key={idx}>
                  <span className="name">{item.productName}</span>{" "}
                  <span className="qty">{`${item.quantity} X ${item.productPrice}`}</span>{" "}
                  <span className="cost">
                    {item.productPrice * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="cartTotal">
              <p>
                Sub Total <span className="cost">{cartTotal}</span>
              </p>
            </div>
          </div>
          <hr />
          <div className="shippingCost">
            <h2>
              SHIPPING COST <span className="cost">{shippingCost}</span>
            </h2>
          </div>
          <hr />
          <div className="totalCost">
            <h2>
              TOTAL COST <span className="cost">{totalCost}</span>
            </h2>
          </div>
        </div>
      </div>
    );
};

export default CheckoutOrderSummary;