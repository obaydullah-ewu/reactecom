import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function ViewCategory() {
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-category').then(res => {
            // console.log(res.data.category)
            if (res.data.status === 200)
            {
                setCategoryList(res.data.category)
            }
            setLoading(false);
        });
    }, []);

    var viewcategory_HTMLTABLE = "";

    if (loading)
    {
        return <h4>Loading Category...</h4>
    }else {
        viewcategory_HTMLTABLE =
            categoryList.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                        <td>{item.status}</td>
                        <td><Link to={`/edit-category/${item.id}`} className="btn btn-success btn-sm"> Edit </Link></td>
                        <td><button to={`/delete-category/${item.id}`} className="btn btn-danger btn-sm"> Delete </button></td>
                    </tr>
                )
            });
    }

    return (
        <div className="container px-4">
            <div className="card">
                <div className="card-header">
                    <h4>Category List
                        <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Add Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {viewcategory_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;
