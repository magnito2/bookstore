import React from "react";
import { useSearchParams } from "react-router-dom";

const UpdateOrder = ({}) => {
    const [search] = useSearchParams();
    const { status, id, ivm, mc, msisdn_custnum } = Object.fromEntries([...search]);

    return (
        <div className="">
            <h2>Order has been placed. </h2>
            <p> Status is {status}, id is {id}, ivm is {ivm}, amount is {mc}</p>
            <p>You can track your order here.</p>
        </div>
    )
}

export default UpdateOrder;