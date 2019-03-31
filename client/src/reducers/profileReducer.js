import Types from '../actions/types'

const initialState = {
    profile: null,
    profiles: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Types.LOADING_PROFILE:
            return {
                ...state,
                loading: true
            };
        case Types.GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case Types.CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null

            };
        case Types.GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };

        default:
            return state;
    }
}