import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { updateOrderStart } from "../../../../redux/Orders/orders.actions";

import './styles.scss';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled', 'Refunded']
const ChangeStatus = ({ order }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const currentStatus = order.status || 'Pending';
    const id = order.documentID;
    const otherStatuses = STATUSES.filter(status => status !== currentStatus);
    const dispatch = useDispatch();
    const ref = useRef(null);

    const setStatus = (status) => {
        dispatch(
            updateOrderStart({
                status,
                id
            })
        );
        setShowDropdown(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log(event.target);
            console.log(ref.current);
            if (ref.current && !ref.current.contains(event.target)) {
              setShowDropdown(false)
            }
          };
          document.addEventListener('click', handleClickOutside, true);
          return () => {
            document.removeEventListener('click', handleClickOutside, true);
          };
    },[]);

    return (
        <div ref={ref} className="changeStatus">
            <span className={`currentStatus status ${currentStatus}`} onClick={() => setShowDropdown(true)}>
                {currentStatus}
            </span>
            { showDropdown && 
                <ul className="dropdown">
                    {
                        otherStatuses.map((status, idx) => <li key={idx} onClick={() => setStatus(status)} className={`status ${status}`}>{status}</li>)}
                </ul>
            }
        </div>
    )
}

export default ChangeStatus;