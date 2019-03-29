import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTpes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from "../../actions/authActions";
import _ from "underscore";

class Navbar extends Component {
    constructor() {
        super();
        _.bindAll(this, 'onLogoutClick');
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    {/*<Link className="nav-link" to="/login">*/}
                    <div className="dropdown">
                        <img src={user.avatar} className="profile-image dropdown-toggle rounded-circle" data-toggle="dropdown"
                             />
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" onClick={this.onLogoutClick}>Logout</a>
                        </div>
                    </div>
                </li>
            </ul>
        );

        const guestLinks = (<ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        DevConnector
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles">
                                    {' '}
                                    Developers
                                </Link>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.prototypes = {
    logoutUser: PropTpes.func.isRequired,
    auth: PropTpes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);
