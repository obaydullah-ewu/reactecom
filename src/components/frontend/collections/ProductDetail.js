import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import {$api_url} from "../../../helpers/env";

function ProductDetail(props)
{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        let isMounted = true;
        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;
        axios.get(`/api/view-product/${category_slug}/${product_slug}`).then(res => {
            if(isMounted)
            {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
                    setLoading(false);
                } else if (res.data.status === 404) {
                    history.push('/collections');
                    swal('warning', res.data.message, "error");
                }

            }
        });

        return () => {
            isMounted = false;
        };
    }, [props.match.params.category, props.match.params.product, history]);

    //Start:: Quantity Increment/decrement in Hooks
    const handleDecrement = () => {
        if (quantity > 1){
            setQuantity(prevCount => prevCount - 1 )
        }
    }
    const handleIncrement = () => {
        if (quantity < 10) {
            setQuantity(prevCount => prevCount + 1 )
        }
    }

    //End:: Quantity Increment/decrement in Hooks

    const submitAddToCart = (e) => {
        e.preventDefault();

        const data = {
            product_id: product.id,
            product_qty: quantity
        }

        axios.post(`/api/add-to-cart`, data).then(res=> {
            if (res.data.status === 200){
                swal("Success", res.data.message, "success");
            } else if (res.data.status === 409){
                // Already added to cart
                swal("Warning", res.data.message, "warning");
            } else if (res.data.message === 401) {
                swal("Error", res.data.message, "error");
            }else if (res.data.message === 404) {
                swal("Warning", res.data.message, "warning");
            }
        });
    }

    if (loading)
    {
        return <h4>Loading Products Detail...</h4>
    } else {
        var avail_stock = '';
        if (product.qty > 0){a
            avail_stock =
                <div>
                    <div>
                        <label className="btn-sm btn-success px-4 mt-2">In stock</label>

                        <div className="row">
                            <div className="col-md-3 mt-3">
                                <div className="input-group">
                                    <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                                    <div className="form-control text-center">{quantity}</div>
                                    <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                                </div>
                            </div>
                            <div className="col-md-3 mt-3">
                                <button type="button" className="btn btn-primary w-100" onClick={submitAddToCart}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
        } else {
            avail_stock =
                <div>
                    <label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
                </div>
        }
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collections/ {product.category.name} / {product.name}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 border-end">
                            <img src={`${$api_url}${product.image}`} alt="Product Image" className="w-100"/>
                        </div>
                        <div className="col-md-8">
                            <h4>
                                { product.name }
                                <span className="float-end badge btn-sm btn-danger badge-pil">{ product.brand}</span>
                            </h4>
                            <p>{ product.description }</p>
                            <h4 className="mb-1">
                                Tk: { product.selling_price }
                                <s className="ms-2">Tk: { product.original_price }</s>
                            </h4>

                            {avail_stock}

                            <button type="button" className="btn btn-danger mt-3">Add to Wishlist</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;