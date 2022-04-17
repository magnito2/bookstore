import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { completeOrderStart } from "../../redux/Orders/orders.actions";

import OrderSuccess from "./OrderSuccess";
import OrderError from "./OrderError";
import OrderPending from "./OrderPending";

import './styles.scss';

const mapState = (state) => ({
    order: state.ordersData.order
})
const CompleteOrder = ({}) => {
    const [search] = useSearchParams();
    const { order } = useSelector(mapState);
    const { status, id, ivm, mc, msisdn_custnum } = Object.fromEntries([...search]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            completeOrderStart({
                status,
                id,
                ivm,
                mc,
                msisdn_custnum
            })
        )
    }, [search]);

    return (
        <div className="orderComplete">
            {order && order.status === 'Success' && <OrderSuccess order={order} />}
            {(order === null || (order && order.status === null)) && <OrderPending />}
            {order && order.status === 'Error' && <OrderError />}
        </div>
    )
}

export default CompleteOrder;