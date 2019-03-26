import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from "./components/layout/Landing";

const Routes = () => {
    let routeArray = [];
    routeArray.push(
        <Route exact path='/' component={Landing}/>,
        <Route exact path="/register" component={Register}/>,
        <Route exact path="/login" component={Login}/>
    );
    return (
        <div>
            <Switch>
                {routeArray}
            </Switch>
        </div>
    )
};

export default Routes;