import React from "react";
import ProductResults from "../../components/ProductResults";
import FilterProducts from "../../components/FilterProducts";
import FilterSchools from "../../components/FilterSchools";

import './styles.scss';

const Search = props => {
    return (
        <div className="searchPage">
            <FilterSchools />
            <FilterProducts />
            <ProductResults />
        </div>
    )
}

export default Search;