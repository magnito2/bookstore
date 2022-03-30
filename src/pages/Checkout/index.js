import React from 'react';

import Shipping from '../../components/Shipping';
import CheckoutCustomerDetails from '../../components/CheckoutCustomerDetails';
import CheckoutOrderSummary from '../../components/CheckoutOrderSummary';
import CheckoutStepsBar from '../../components/CheckoutStepsBar';

import './styles.scss';

const Checkout = ({}) => {
    return (
        <div className='checkoutPage'>
            <div className='headerWrap'>
                <CheckoutStepsBar />
            </div>
            <div className='mainWrap'>
                <CheckoutOrderSummary />
                <Shipping />
                <CheckoutCustomerDetails />
            </div>
        </div>
    );
}

export default Checkout;