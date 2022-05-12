import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderStart } from "../../../../redux/Orders/orders.actions";
import LoadingAnim from "../../../LoadingAnim";

import OrderItems from "./OrderItems";

import './styles.scss';

const mapState = (state) => ({
    order: state.ordersData.order
})

const OrderDetails = ({}) => {
    const { order } = useSelector(mapState);
    const { orderID } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            fetchOrderStart(orderID)
        )
    }, []);

    return (
      <div className="orderDetails">
        {order ? (
          <>
            <div className="wrap">
            <div className="infoCard">
              <div className="topRow">
                <span>
                  Order No: <span className="orderID">#{order.documentID}</span>
                </span>

                <span className={`status ${order.status || "Pending"}`}>
                  {order.status || "Pending"}
                </span>
              </div>
              <div className="customerDetails">
                <div className="created">
                  <h3 className="subTitle">Order Created at</h3>
                  <p>31/03/22 at 4:35pm</p>
                </div>
                <div className="name">
                  <h3 className="subTitle">Name</h3>
                  <p>{order.name}</p>
                </div>
                <div className="email">
                  <h3 className="subTitle">Email</h3>
                  <p>{order.email}</p>
                </div>
                <div className="contact">
                  <h3 className="subTitle">Contact</h3>
                  <p>{order.mobile}</p>
                </div>
              </div>
              <div className="address">
                <div className="delivery">
                  <div className="title">
                    <h3>Delivery Address</h3>
                    <span className="edit">Edit</span>
                  </div>
                  <p className="placeName">Where: Pick Up Station</p>
                  <p>Name: Busia Town</p>
                  <p>Jumia Office, Bus Station</p>
                  <p>Contact: 0724576234</p>
                </div>
                <div className="billing">
                  <div className="title">
                    <h3>Billing Address</h3>
                    <span className="edit">Edit</span>
                  </div>
                  <p>Type: MPESA</p>
                  <p>Name: Magnus Otwani</p>
                  <p>transaction ID</p>
                  <p>0724576234</p>
                </div>
              </div>
            </div>
            <div className="priceWrap">
              <div className="priceCard card">
                <h3 className="title">Price</h3>
                <p>Sub Total: KES 000.00</p>
                <p>Shipping: KES 00.00</p>
                <p>Tax(16%): KES 00.00</p>
                <p className="total">Total: KES 000.00</p>
              </div>
              <div className="invoiceCard card">
                <h3 className="title">Invoice</h3>
                <p>Invoice No: #InvoiceNo</p>
                <p>Seller GST:</p>
                <p>Purchase GST:</p>
              </div>
            </div>
            </div>
            <div className="itemsCard">
              <h3 className="title">ORDER ITEMS</h3>
              <OrderItems items={order.items} />
            </div>
          </>
        ) : (
          <LoadingAnim />
        )}
      </div>
    );
};

export default OrderDetails;