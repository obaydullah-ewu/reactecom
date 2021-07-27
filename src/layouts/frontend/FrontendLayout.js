import React from "react";
import {Switch, Route} from "react-router-dom";
import Navbar from "./Navbar";
import publicRoutesList from "../../routes/PublicRouteList";

const FrontendLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Switch>
                    {publicRoutesList.map((routeData, idx) => {
                        return (
                            routeData.component && (
                                <Route
                                    key={idx}
                                    path={routeData.path}
                                    exact={routeData.exact}
                                    name={routeData.name}
                                    render={(props) => (
                                        <routeData.component {...props} />
                                    )}
                                />
                            )
                        )
                    })}
                </Switch>
            </div>
        </div>
    );
}

export default FrontendLayout;
