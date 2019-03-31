import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create_profile/CreateProfile";
import EditProfile from "./components/edit_profile/EditProfile";
import AddExperience from "./components/add_credentials/AddExperience";
import AddEducation from "./components/add_credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

import Url from "./url";



const Routes = () => {
    let routeArray = [];
    routeArray.push(
        <Route exact path={Url.LANDING} component={Landing}/>,
        <PrivateRoute exact path={Url.DASHBOARD} component={Dashboard}/>,
        <PrivateRoute exact path={Url.CREATE_USER_PROFILE} component={CreateProfile}/>,
        <PrivateRoute exact path={Url.EDIT_PROFILE} component={EditProfile}/>,
        <PrivateRoute exact path={Url.ADD_EXPERIENCE} component={AddExperience}/>,
        <PrivateRoute exact path={Url.ADD_EDUCATION} component={AddEducation}/>,
        <Route exact path={Url.REGISTER_USER} component={Register}/>,
        <Route exact path={Url.LOGIN_USER} component={Login}/>,
        <Route exact path={Url.PROFILES} component={Profiles}/>,
        <Route exact path={Url.PROFILE} component={Profile}/>,
        <PrivateRoute exact path={Url.POST_FEED} component={Posts} />,
        <PrivateRoute exact path={Url.POST} component={Post} />,
        <Route exact path={Url.PROFILE_NOT_FOUND} component={NotFound}/>,
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