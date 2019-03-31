import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {getCurrentProfile, deleteAccount} from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Link from "react-router-dom/es/Link";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        _.bindAll(this, 'getDashboardContent', 'onDeleteClick');
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick(e) {
        e.preventDefault();
        this.props.deleteAccount();
    }
    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;
        let dashboardContent;
        dashboardContent = this.getDashboardContent(profile, loading, user);
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4"> Dashboard </h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getDashboardContent(profile, loading, user) {
        let dashboardContent;
        if (profile == null || loading) {
            dashboardContent = <Spinner/>
        } else {
            // Check if profile has empty data
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome <Link
                            to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                        <ProfileActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        <div style={{ marginBottom: '60px' }} />
                        <button
                            onClick={this.onDeleteClick}
                            className="btn btn-danger"
                        >
                            Delete My Account
                        </button>
                    </div>
                )
            } else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p> You have not yet setup a profile, please add some info </p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                )
            }
        }
        return dashboardContent;
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);