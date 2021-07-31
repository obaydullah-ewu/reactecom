import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function ViewCategory()
{
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    useEffect(()=> {
        document.title = "Collections";
        axios.get('/api/getCategory').then( res=> {
           if (res.data.status === 200)
           {
               console.log(res.data.categories)
               setCategory(res.data.categories);
           }
           setLoading(false)

        });
    }, []);
    var showCategoryList = "";
    if (loading)
    {
        return <h4>Loading Categories....</h4>
    }
    else{
        showCategoryList = category.map( (item, idx) => {
            return (
                <div className="col-md-4" key={idx}>
                    <div className="card">
                        <Link to={`collections/${item.slug}`}>
                            <img src="" alt={item.name}/>
                            <div className="card-body">
                                <h5>{item.name}</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        })
    }
    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Category Page</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showCategoryList}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewCategory;
