import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrdersStart } from "../../../../redux/Orders/orders.actions";

import Tooltip from "../../../Tooltip";
import ordersTypes from "../../../../redux/Orders/orders.types";

import "./styles.scss";
import ChangeStatus from "../ChangeStatus";

const mapState = state => ({
    orders: state.ordersData.orders
});

export const OrderList = ({}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchOrdersStart()
        )
    }, []);
    return (
        <div className="orderList">
            <div className="title">
                <h1>Order List</h1>
            </div>
            <div className="orderTable">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th><span>STATUS</span></th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => (
                        <tr key={idx}>
                            <td></td>
                            <td className="id" onClick={() => navigate(`/admin/orders/${order.documentID}`)}>{order.documentID}</td>
                            <td>{order.name}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.total}</td>
                            <td>
                                
                            <ChangeStatus order={order} />
                                
                            </td>
                            <td></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderList;