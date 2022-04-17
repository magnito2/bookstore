import React from "react";
import { ReactComponent as Spinner } from '../../assets/tail-spin.svg'

const SpinnerAnim = ({}) => {
    return (
        <div className="spinner">
            <Spinner className="spin"/>
        </div>
    )
}

export default SpinnerAnim;