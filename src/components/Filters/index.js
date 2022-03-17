import React, { useState } from "react";
import FilterSchools from "./FilterSchools";
import FilterProducts from "./FilterProducts";

import './styles.scss';

const Filters = ({}) => {

    const [activeItem, setActiveItem] = useState('schools');

    return (
        <div className="filters">
            <h1 className="filterHeader">CATEGORIES</h1>
            <ul className="filterList">
                <li onClick={() => setActiveItem('years')} className={activeItem === 'years' ? 'active' : null}>CLASSES / YEAR</li>
                <li onClick={() => setActiveItem('schools')} className={activeItem === 'schools' ? 'active' : null}>SCHOOLS</li>
            </ul>
            <div className="filterItem">
                { activeItem === 'schools' ? <FilterSchools /> : <FilterProducts />}
            </div>
        </div>
    )
}

export default Filters;