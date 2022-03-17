import React from "react";
import ProductResults from "../../components/ProductResults";
import Filters from "../../components/Filters";

import './styles.scss';

const Search = props => {
    return (
        <div className="searchPage">
            <div className="filters">
                <Filters />
            </div>
            <ProductResults />
        </div>
    )
}

export default Search;