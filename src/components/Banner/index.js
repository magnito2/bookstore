import React from "react";

import "./styles.scss";

import bannerIMG from '../../assets/banner-holder.png';

const Banner = ({}) => {
    return (
        <div className="banner">
            <img src={bannerIMG} />
        </div>
    )
}

export default Banner;