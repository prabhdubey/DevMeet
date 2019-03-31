import axios from 'axios';
import Types from './types';
import Url from "../url";

// action to get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get(Url.API_GET_USER_PROFILE)
        .then(res => {
            dispatch({
                type: Types.GET_PROFILE,
                payload: res.data.data
            });
        })
        .catch(err => {
            dispatch({
                type: Types.GET_PROFILE,
                payload: {}
            });
        })

};

export const createProfile = (profileData, history) => dispatch => {
    axios
        .post(Url.API_CREATE_PROFILE, profileData)
        .then(res => history.push(Url.DASHBOARD))
        .catch(err =>
            dispatch({
                type: Types.GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const setProfileLoading = () => {
    return {
        type: Types.LOADING_PROFILE
    }
};

export const clearCurrentProfile = () => {
    return {
        type: Types.CLEAR_CURRENT_PROFILE
    }
};

export const deleteAccount = ()  => dispatch => {
    if (window.confirm('Are you sure you want to delete')) {
        axios.delete(Url.API_DELETE_ACCOUNT)
            .then(res => {
                dispatch({
                    type: Types.SET_CURRENT_USER,
                    payload: {}
                })
            })
            .catch(err =>
                dispatch({
                    type: Types.GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
    axios
        .post(Url.API_ADD_EXPERIENCE, expData)
        .then(res => history.push(Url.DASHBOARD))
        .catch(err =>
            dispatch({
                type: Types.GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
    axios
        .post(Url.API_ADD_EDUCATION, eduData)
        .then(res => history.push(Url.DASHBOARD))
        .catch(err =>
            dispatch({
                type: Types.GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteExperience = id => dispatch => {
    axios
        .delete(`${Url.API_DELETE_USER_EXPERIENCE}/${id}`)
        .then(res =>
            dispatch({
                type: Types.GET_PROFILE,
                payload: res.data.data
            })
        )
        .catch(err =>
            dispatch({
                type: Types.GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete Education
export const deleteEducation = id => dispatch => {
    axios
        .delete(`${Url.API_DELETE_USER_EDUCATION}/${id}`)
        .then(res =>
            dispatch({
                type: Types.GET_PROFILE,
                payload: res.data.data
            })
        )
        .catch(err =>
            dispatch({
                type: Types.GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`${Url.API_GET_PROFILE_BY_HANDLE}/${handle}`)
        .then(res =>
            dispatch({
                type: Types.GET_PROFILE,
                payload: res.data.data
            })
        )
        .catch(err =>
            dispatch({
                type: Types.GET_PROFILE,
                payload: null
            })
        );
};

// Get all profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(Url.API_ALL_USERS_PROFILES)
        .then(res => {
                dispatch({
                    type: Types.GET_PROFILES,
                    payload: res.data.data
                })
            }
        )
        .catch(err =>
            dispatch({
                type: Types.GET_PROFILES,
                payload: null
            })
        );
};
