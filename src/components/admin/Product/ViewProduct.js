import React from "react";
import {Link} from "react-router-dom";

function ViewProduct()
{
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
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Product Name</th>
                                    <th> Selling Price</th>
                                    <th> Selling Price</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;
