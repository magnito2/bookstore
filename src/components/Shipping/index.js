import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShippingZonesStart, setShippingAddress } from "../../redux/Shipping/shipping.actions";
import { selectCartTotal } from "../../redux/Cart/cart.selectors";
import { selectShippingCost } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";

import FormSelect from "../forms/FormSelect";

import './styles.scss';

const mapState = (state) => ({
    shippingData: state.shippingData.zones
});

const mapState2 = createStructuredSelector({
    total : selectCartTotal,
    shippingCost : selectShippingCost
})

const Shipping = ({}) => {

    const dispatch = useDispatch();
    const { shippingData } = useSelector(mapState);
    const { total, shippingCost } = useSelector(mapState2);

    const [deliveryOption, setDeliveryOption] = useState('pickup_station');
    const [selectedZone, setSelectedZone] = useState(undefined);

    useEffect(() => {
        dispatch(
            fetchShippingZonesStart()
            );
    }, []);

    useEffect(() => {
        if(selectedZone){
            const shippingAddress = shippingData.find(dat => dat.documentID === selectedZone)
            dispatch(setShippingAddress({
                ...shippingAddress,
                deliveryOption,
                delivery: shippingAddress.delivery[deliveryOption]
            }))
        }
    }, [deliveryOption, selectedZone])

    return (
        <div className="shipping checkOutItem">
            <div className="title">
                <h1>Shipping</h1>
            </div>
            <div className="form">
                <form>
                    <FormSelect 
                        options={ [
                                {
                                    name: 'Choose City/Town',
                                    value: '',
                                    index: -1
                                },
                            ...shippingData.map((dat, idx) => ({
                                name: dat.documentID.replace('_', ' '),
                                value: dat.documentID,
                                index: idx
                            }))
                            ] 
                        }
                        handleChange={(e) => setSelectedZone(e.target.value)}
                    />
                    <FormSelect 
                        
                        options={
                            [
                                {
                                    name: 'Pick Up Station',
                                    value: 'pickup_station'
                                },
                                {
                                    name: 'Door Delivery',
                                    value: 'door'
                                }
                            ]
                        }
                        handleChange={(e) => setDeliveryOption(e.target.value)}
                    
                    />
                    <div className="formRow">
                        <p className="formDisplay">Estimated time taken</p>
                    </div>
                    <div className="formRow">
                        <p className="formDisplay">Cost of shipping  <span className="shippingCost">{ shippingCost }</span></p>
                    </div>
                    <div className="formRow">
                        <p className="formDisplay">New Subtotal <span className="shippingCost">{ selectedZone && selectedZone.cost ? `${Number(total) + Number(selectedZone.cost)}/=` : ''}</span></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Shipping;