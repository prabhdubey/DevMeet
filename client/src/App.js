import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decoode from 'jwt-decode';
import authUtils from './utils/authUtils';
import {setCurrentUser} from "./actions/authActions";

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';

import './assets/stylesheets/App.css';
import {Provider} from 'react-redux';

if (localStorage.jwtToken) {
    authUtils.setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decoode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing}/>
                        <div className="container">
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
