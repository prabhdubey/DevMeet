import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decoode from 'jwt-decode';
import authUtils from './utils/authUtils';
import {setCurrentUser, logoutUser} from "./actions/authActions";
import {clearCurrentProfile} from "./actions/profileActions";

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import store from './store';

import './assets/stylesheets/App.css';
import {Provider} from 'react-redux';
import Url from "./url";
import Routes from "./router";

if (localStorage.jwtToken) {
    authUtils.setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decoode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = Url.LOGIN_USER;
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Routes/>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
