import React from 'react';

import './styles.scss';

const CheckoutStepsBar = ({}) => {
    return (
      <div className="checkoutStepsBar">
        <div className='backStrip'>
            
        </div>
        <div className="circlesWrapper">
          <div className="circle">
            <p>1</p>
          </div>
          <div className="circle active">
            <p>2</p>
          </div>
          <div className="circle">
            <p>3</p>
          </div>
        </div>
      </div>
    );
};

export default CheckoutStepsBar;