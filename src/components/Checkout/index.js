import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems, selectCartTotal } from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import Button from './../forms/Button';
import Item from "./Item";
import "./styles.scss";

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total : selectCartTotal
})

const Checkout = ({}) => {
    const { cartItems, total } = useSelector(mapState);
    const navigate = useNavigate();

    return (
      <div className="checkout">
        <h1>Checkout</h1>

        <div className="cart">
            {
            cartItems.length > 0 ? 
                    (<table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                    <tr>
                        <table
                        className="checkoutHeader"
                        border="0"
                        cellPadding="10"
                        cellSpacing="0"
                        >
                        <tbody>
                            <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Remove</th>
                            </tr>
                        </tbody>
                        </table>
                    </tr>
                    <tr>
                        <table border="0" cellPadding="0" cellSpacing="0">
                        <tbody>
                            {cartItems.map((item, pos) => {
                            return (
                                <tr key={pos}>
                                <td>
                                    <Item {...item}/>
                                </td>
                                </tr>
                            );
                            })}
                        </tbody>
                        </table>
                    </tr>
                    <tr>
                        <table
                        align="right"
                        border="0"
                        cellSpacing="0"
                        cellPadding="10"
                        >
                        <tr align="right">
                            <td>
                            <h3>
                                Total: KES {total}
                                </h3>
                            </td>
                        </tr>
                        <tr>
                            <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <Button onClick={() => navigate(-1)}>
                                            Continue Shopping
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                          onClick = {() => navigate('/checkout')}
                                        >
                                            Checkout
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </tr>
                        </table>
                    </tr>
                    </tbody>
                </table>) : 
                <p>You have no items in your Cart</p>
            }
        </div>
      </div>
    );
};

export default Checkout;