import React from "react";
import SVGSuccess from "../../svgAnims/SVGSuccess";

import './styles.scss';

const OrderSuccess = ({ order }) => {
    return (
        <div className="card">
            <div className="svg">
                <SVGSuccess />
            </div>
            <div className="title">
                <h2>Thank you for placing your order!</h2>
            </div>
            <div className="banner">
                <h2>TOTAL {order.total}/=</h2>
            </div>
            <div className="items">

            </div>
        </div>
    )
}

export default OrderSuccess;