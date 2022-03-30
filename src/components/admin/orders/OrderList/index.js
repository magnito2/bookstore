import React from "react";

import "./styles.scss";

export const OrderList = ({}) => {
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
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>#2343443</td>
                            <td>Faustine Ngalao</td>
                            <td>23-3-2021</td>
                            <td>600/=</td>
                            <td>Shipped</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderList;