import { createSelector } from 'reselect';

export const selectCartData = state => state.cartData;
export const selectShippingData = state => state.shippingData;

export const selectCartItems = createSelector(
    [selectCartData],
    cartData => cartData.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (quantity, cartItem) => 
            quantity + cartItem.quantity
        , 0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (quantity, cartItem) => 
                quantity + cartItem.quantity * cartItem.productPrice,
            0
        )
);

export const selectShippingCost = createSelector(
    [selectShippingData],
    shippingData => shippingData.cost
)

export const selectTotalCost = createSelector(
    [selectCartTotal, selectShippingCost],
    (cartTotal, shippingCost) => cartTotal + shippingCost
)