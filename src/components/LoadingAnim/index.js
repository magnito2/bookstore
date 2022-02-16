import React from "react";
import { ReactComponent as Loader } from '../../assets/loader.svg'

import './styles.scss';

const LoadingAnim = ({}) => {
    return (
        <div className="loader">
            <Loader />
        </div>
    );
}

export default LoadingAnim;