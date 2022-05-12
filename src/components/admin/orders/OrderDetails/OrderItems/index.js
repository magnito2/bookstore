import React from "react";

import './styles.scss';

const OrderItems = ({items}) => {
    return (
        <table className="orderItems">
            <thead>
                <tr>
                    <th>PHOTO</th>
                    <th>NAME</th>
                    <th>QUANTITY</th>
                    <th>PRICE</th>
                    <th>TOTAL</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item, index) => 
                    (<tr>
                        <td className="thumb"><img src={item.productThumbnail} alt='book' /></td>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.productPrice}</td>
                        <td>{item.productPrice * item.quantity}</td>
                    </tr>)
                    )
                }
            </tbody>
        </table>
    )
}

export default OrderItems;