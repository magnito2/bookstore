import React from "react";

import SpinnerAnim from "../../SpinnerAnim";

import './styles.scss';

const OrderPending = ({}) => {
    return (
        <div className="orderPending">
            <div className="svg">
                <SpinnerAnim />
                <h2>Updating payment ...</h2>
            </div>
        </div>
    )
}

export default OrderPending;