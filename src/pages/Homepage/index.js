import React from "react";

import Banner from "../../components/Banner";
import ProductResults from "../../components/ProductResults";

import "./styles.scss";

const Homepage = props => {
    return (
        <section className="homepage">
            <Banner />
            <ProductResults />
        </section>
    );
};

export default Homepage;