import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShippingStart, setShippingCost } from "../../redux/Shipping/shipping.actions";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";

import FormSelect from "../forms/FormSelect";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";

import './styles.scss';

const mapState = (state) => ({
    shippingData: state.shippingData.zones
});

const mapState2 = createStructuredSelector({
    cartItems: selectCartItems,
    total : selectCartTotal
})

const Shipping = ({}) => {

    const dispatch = useDispatch();
    const { shippingData } = useSelector(mapState);
    const { cartItems, total } = useSelector(mapState2);

    const [shipping, setShipping ] = useState([]);
    const [shippingOptions, setShippingOptions] = useState([]);
    const [selectedZone, setSelectedZone] = useState(undefined);

    useEffect(() => {
        dispatch(
            fetchShippingStart()
            );
    }, []);

    useEffect(() => {
        const shipArr = [];
        shippingData.map((shipStn, idx) => {
            const shipTo = {
                name: shipStn.documentID.replace('_', ' '),
                value: idx,
                cost: shipStn.cost || ''
            }
            shipArr.push(shipTo);
        })
        setShipping(shipArr);
    }, [shippingData]);

    const handleChangeCity = (event) => {
        const selectedZoneIdx = event.target.value;
        const selectedZone = shipping[selectedZoneIdx];
        setSelectedZone(selectedZone);
        dispatch(setShippingCost(+selectedZone.cost))
    }

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
                                    name: 'City/Town',
                                    value: '',
                                    index: -1
                                },
                            ...shipping
                            ] 
                        }
                        handleChange={(e) => handleChangeCity(e)}
                    />
                    <FormSelect 
                        
                        options={
                            [
                                {
                                    name: 'Available Shipping Options',
                                    value: ''
                                },
                                {
                                    name: 'Jumia Shipping',
                                    value: 'jumia'
                                }
                            ]
                        }
                    
                    />
                    <div className="formRow">
                        <p className="formDisplay">Estimated time taken</p>
                    </div>
                    <div className="formRow">
                        <p className="formDisplay">Cost of shipping  <span className="shippingCost">{ selectedZone && selectedZone.cost ? `${selectedZone.cost}/=` : ''}</span></p>
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