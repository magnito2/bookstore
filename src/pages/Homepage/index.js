import React from "react";

import Directory from "../../components/Directory";
import ProductResults from "../../components/ProductResults";

import "./styles.scss";

const Homepage = props => {
    return (
        <section className="homepage">
            <ProductResults />
        </section>
    );
};

export default Homepage;