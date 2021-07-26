import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {$api_url} from "../../../helpers/env";

function ViewProduct()
{
    document.title = "View Product";

    const [loading, setLoading] = useState(true);
    const[viewProduct, setProduct] = useState([]);
    useEffect(() => {
        axios.get(`/api/view-product`).then(res => {
            if (res.data.status === 200)
            {
                setProduct(res.data.products);
            }
            setLoading(false);
        });
    }, []);

    var display_productData = "";

    if (loading)
    {
        return <h4>Loading Product list...</h4>
    }else {
        var ProdStatus = '';
        display_productData = viewProduct.map((item) => {
            if (item.status == '0')
            {
                ProdStatus = 'shown';
            }else if (item.status == '1')
            {
                ProdStatus = 'Hidden'
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`${$api_url}${item.image}`} width="100px" alt={item.name}/></td>
                    <td><Link to={`/admin/edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link></td>
                    {/*<td><button type="button" className="btn btn-danger btn-sm">Delete</button></td>*/}
                    <td>{ProdStatus}</td>
                </tr>
            )
        });
    }
    return(
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>View Product
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Product Name</th>
                                    <th>Selling Price</th>
                                    <th>Image</th>
                                    <th>Edit</th>
                                    {/*<th>Delete</th>*/}
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {display_productData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;
