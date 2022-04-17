import React from "react";

import './styles.scss';

const OrderItems = ({items}) => {
    return (
        <table>
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
                        <td><img src={item.img} alt='book' /></td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.total}</td>
                    </tr>)
                    )
                }
            </tbody>
        </table>
    )
}

export default OrderItems;