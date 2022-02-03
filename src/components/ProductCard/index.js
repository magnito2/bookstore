import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductStart, setProduct} from './../../redux/Products/products.actions';
import { addProduct } from "../../redux/Cart/cart.actions";
import Button from './../forms/Button';
import "./styles.scss";

const mapState = state => ({
    product: state.productsData.product
});

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const { product } = useSelector(mapState);
    const { productID } = useParams();

    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc
    } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, []);

    const configAddtoCartBtn = {
        type: 'button',

    }

    const handleAddToCart = product => {
        dispatch(
            addProduct(product)
        )
    }

    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail} />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                             {productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button 
                                {...configAddtoCartBtn}
                                onClick = {() => handleAddToCart(product) }
                            >
                                Add to cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span dangerouslySetInnerHTML={{ __html: productDesc }} />
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default ProductCard;