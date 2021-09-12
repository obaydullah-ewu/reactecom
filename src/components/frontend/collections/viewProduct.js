import React, {useEffect, useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import {Link, useHistory} from "react-router-dom";
import {$api_url} from "../../../helpers/env";

function ViewProduct(props)
{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);

    const productCount = product.length;

    useEffect(() => {

        let isMounted = true;
        const product_slug = props.match.params.slug;
        axios.get(`/api/fetchproducts/${product_slug}`).then(res => {
            if(isMounted)
            {
                if (res.data.status === 200) {
                    console.log(res.data.product_data.product)
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
                }
                else if (res.data.status === 400) {
                    setCategory(res.data.product_data.category);
                    swal('warning', res.data.message, "error");
                }
                else if (res.data.status === 404) {
                    history.push('/collections');
                    swal('warning', res.data.message, "error");
                }
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [props.match.params.slug, history]);

    if (loading)
    {
        return <h4>Loading Products...</h4>
    }
    else {
        var showProductList = '';
        if (productCount)
        {
            showProductList = product.map( (item, idx) => {
                return (
                    <div className="col-md-3" key={idx}>
                        <div className="card">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                <img src={`${$api_url}${item.image}`} className="w-100" alt={ item.name } />
                            </Link>
                            <div className="card-body">
                                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <h5>{ item.name }</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            });
        } else {
            showProductList =
                <div className="col-md-12">
                    <h4>No Product Available for {category.name}</h4>
                </div>
        }
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collections/ {category.name}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showProductList}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;