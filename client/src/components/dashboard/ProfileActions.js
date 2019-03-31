import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Url from "../../url";

export default class ProfileActions extends Component{
    render() {
        return (
            <div className="btn-group mb-4" role="group">
                <Link to={Url.EDIT_PROFILE} className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1"/> Edit Profile
                </Link>
                <Link to={Url.ADD_EXPERIENCE} className="btn btn-light">
                    <i className="fab fa-black-tie text-info mr-1"/>
                    Add Experience
                </Link>
                <Link to={Url.ADD_EDUCATION} className="btn btn-light">
                    <i className="fas fa-graduation-cap text-info mr-1"/>
                    Add Education
                </Link>
            </div>
        );
    }
};


