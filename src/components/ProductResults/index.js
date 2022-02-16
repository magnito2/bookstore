import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "./Product";
import FormSelect from "../forms/FormSelect";
import LoadMore from "../LoadMore";
import LoadingAnim from "../LoadingAnim";

import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products,
    isLoading : productsData.isLoading
});

const ProductResults = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { filterType } = useParams();

    const { products, isLoading } = useSelector(mapState);

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        );
    }, [ filterType ]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        navigate(`/search/${nextFilter}`);
    }

    const configFilters = {
        defaultValue: filterType,
        options : [
            {
                name: 'Show all',
                value: ''
            },
            {
                name: 'Primary School',
                value: 'primarySchool'
            },
            {
                name: 'Secondary School',
                value: 'secondarySchool'
            }
        ],
        handleChange: handleFilter
    } 

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({ 
                filterType, 
                startAfterDoc: queryDoc,
                persistProducts: data
             })
        );
    }

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore
    }

    if(!Array.isArray(data)) return null;

    if(data.length < 1){
        return (
            <div className="products">
                <FormSelect { ...configFilters } />
                <p>
                    No Search Results
                </p>
            </div>
        )
    }

    return (
        <div className="products">
            <h1> Browse Books </h1>
            <FormSelect { ...configFilters } />
            { isLoading ? <LoadingAnim /> : null}
            <div className="productResults">
            {
                data.map((product, pos) => {
                    const { productThumbnail, productName, productPrice } = product;
                    if(!productThumbnail || !productName || typeof(productPrice) === 'undefined') return null;
                    const configProduct = {
                        ...product
                    };
                    return (
                        <Product { ...configProduct } key={`prod-${pos}`} />
                    );
                })
            }
            </div>
            {!isLastPage &&
            <LoadMore {...configLoadMore} />
            }
        </div>
    )
}

export default ProductResults; 