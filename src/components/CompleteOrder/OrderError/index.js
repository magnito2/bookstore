import React from "react";
import SVGError from "../../svgAnims/SVGError";

import './styles.scss';

const OrderError = ({}) => {
    return (
        <div className="card">
            <SVGError />
            <h2>There was an error placing the order</h2>
            <p>Kindly contact us for help</p>
        </div>
    )
}

export default OrderError;