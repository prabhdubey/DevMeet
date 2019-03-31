import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {registerUser} from "../../actions/authActions";
import _ from "underscore";
import Url from "../../url";
import TextFieldGroup from "../common/TextFieldGroup";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        };

        _.bindAll(this, 'onChange', 'onSubmit');
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push(Url.DASHBOARD);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your DevConnector account
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextFieldGroup
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextFieldGroup
                                        type="email"
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                        error={errors.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextFieldGroup
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextFieldGroup
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChange}
                                        error={errors.confirmPassword}
                                    />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


const mapStateTopProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateTopProps, {registerUser})(withRouter(Register));
