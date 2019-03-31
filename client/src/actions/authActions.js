import Types from './types';
import axios from 'axios';
import Url from "../url";
import jwt_decode from 'jwt-decode';
import AuthUtils from '../utils/authUtils';

// Register user action
export const registerUser = (userData, history) => dispatch => {
    axios
        .post(Url.API_REGISTER_USER, userData)
        .then(res => {
            history.push(Url.LOGIN_USER);
        })
        .catch(err => dispatch({
            type: Types.GET_ERRORS,
            payload: err.response.data.errors
        }));
};

// Login user action
export const loginUser = userData => dispatch => {
    axios.post(Url.API_LOGIN_USER, userData)
        .then(res => {
            // save token to localstorage
            const {token} = res.data.data;
            localStorage.setItem('jwtToken', token);

            // set token auth header
            AuthUtils.setAuthToken(token);

            // decode jwt token
            const decoded = jwt_decode(token);

            // set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: Types.GET_ERRORS,
                payload: err.response.data.errors
            }));
};

// set current user
export const setCurrentUser = decoded => {
    return {
        type: Types.SET_CURRENT_USER,
        payload: decoded
    }
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    AuthUtils.setAuthToken(false);
    dispatch(setCurrentUser({}));
    window.location.href = Url.LANDING;
};