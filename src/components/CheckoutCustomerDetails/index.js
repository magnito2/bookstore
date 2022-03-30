import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { prepareOrderStart } from "../../redux/Orders/orders.actions";

import {  selectTotalCost } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";

import FormSelect from "../forms/FormSelect";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";

import './styles.scss';

const mapState = createStructuredSelector({
    totalCost : selectTotalCost
})

const mapState2 = (state) => ({
  ordersData: state.ordersData
});

const CheckoutCustomerDetails = ({}) => {
    const dispatch = useDispatch();
    const { totalCost } = useSelector(mapState);
    const { ordersData } = useSelector(mapState2);
    const { order } = ordersData;
     const [name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [orderHash, setOrderHash] = useState('');

    const prepareOrder = (e) => {
        e.preventDefault();
        const cbk = window.location.origin.toString() + '/orderComplete';
        dispatch(
            prepareOrderStart({
                name,
                email,
                mobile,
                total: totalCost,
                cbk
            })
        );
    }
    useEffect(() => {
      console.log('order has changed');
    }, [order]);

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
              <Button className="btn active" onClick={(e) => prepareOrder(e)}>CHECKOUT</Button>
            </div>
          </form> 
          :
          <form action="https://payments.ipayafrica.com/v3/ke">
            { Object.keys(order).map(key => {
                return <input type='hidden' name={key} value={order[key]} />
              })
            }
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