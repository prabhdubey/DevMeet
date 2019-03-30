import axios from 'axios';
import Types from './types';
import Url from "../url";

// action to get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get(Url.GET_USER_PROFILE)
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

export const setProfileLoading = () => {
    return {
        type: Types.LOADING_PROFILE
    }
};

export const clearCurrentProfile = () => {
    return {
        type: Types.CLEAR_CURRENT_PROFILE
    }
};;