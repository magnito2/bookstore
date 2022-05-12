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

export const selectShippingAddress = createSelector(
    [selectShippingData],
    shippingData => shippingData.address
)

export const selectShippingCost = createSelector(
    [selectShippingAddress, selectCartItemsCount],
    (shippingAddress, itemsCount)  => {
        if(shippingAddress == undefined || shippingAddress.delivery == undefined) return 0
        if(itemsCount <= 5) return shippingAddress.delivery.small
        if(itemsCount <=10) return shippingAddress.delivery.medium
        return shippingAddress.delivery.large
    }
);

export const selectTotalCost = createSelector(
    [selectCartTotal, selectShippingCost],
    (cartTotal, shippingCost) => +cartTotal + +shippingCost
)