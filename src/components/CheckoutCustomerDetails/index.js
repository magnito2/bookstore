import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { prepareOrderStart } from "../../redux/Orders/orders.actions";

import {  selectCartTotal, selectTotalCost, selectShippingCost } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";

import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import SpinnerAnim from "../SpinnerAnim";

import './styles.scss';

const mapState = createStructuredSelector({
    totalCost : selectTotalCost,
    cartTotalCost : selectCartTotal,
    shippingCost : selectShippingCost
})

const mapState2 = (state) => ({
  ordersData: state.ordersData,
  cartData: state.cartData
});

const CheckoutCustomerDetails = ({}) => {
    const dispatch = useDispatch();
    const { totalCost, cartTotalCost, shippingCost } = useSelector(mapState);
    const { ordersData, cartData } = useSelector(mapState2);
    const { order, showLoader } = ordersData;
     const [name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const prepareOrder = (e) => {
        e.preventDefault();
        const cbk = window.location.origin.toString() + '/orderComplete';
        const items = cartData.cartItems.map(item => (
          {
            documentID: item.documentID,
            productDesc : item.productDesc,
            productName : item.productName,
            productThumbnail : item.productThumbnail,
            productPrice: item.productPrice,
            quantity: item.quantity,
            grade: item.grade,
            subject: item.subject,
            year: item.year
          }
        ))
        dispatch(
            prepareOrderStart({
                name,
                email,
                mobile,
                total: totalCost,
                cbk,
                items,
                shippingCost,
                cartTotalCost
            })
        );
    }

    return (
      <div className="customerDetails checkOutItem">
        <div className="title">
          <h1>Customer Details</h1>
        </div>
        <div className="form">
          {order === null ? 
          <form>
            <FormInput
              placeholder="name"
              handleChange={(e) => setName(e.target.value)}
            />
            <FormInput
              placeholder="email address"
              handleChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              placeholder="mobile number"
              handleChange={(e) => setMobile(e.target.value)}
            />
            <div className="formRow">
              {showLoader && <SpinnerAnim className="spin"/>}
              <Button className="btn active" onClick={(e) => prepareOrder(e)}>
                CHECKOUT
              </Button>
              {showLoader && <SpinnerAnim className="spin"/>}
            </div>
          </form> 
          :
          <form action="https://payments.ipayafrica.com/v3/ke">
            <div className="formRow">
            { Object.keys(order).map((key, idx) => {
                return <input type='hidden' key={idx} name={key} value={order[key]} />
              })
            }
            </div>
            <div className="formRow">
              <Button type="submit" className="btn active">PAY</Button>
            </div>
          </form>
          }
        </div>
      </div>
    );
}

export default CheckoutCustomerDetails;