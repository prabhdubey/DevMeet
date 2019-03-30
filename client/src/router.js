import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";

const Routes = () => {
    let routeArray = [];
    routeArray.push(
        <Route exact path='/' component={Landing}/>,
        <PrivateRoute exact path='/dashboard' component={Dashboard}/>,
        <Route exact path="/register" component={Register}/>,
        <Route exact path="/login" component={Login}/>
    );
    return (
        <div className="container">
            <Switch>
                {routeArray}
            </Switch>
        </div>
    )
};

export default Routes;