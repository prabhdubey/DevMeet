import Types from '../actions/types'
import Validator from '../validations/helper_validator';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Types.SET_CURRENT_USER: {
             return {
                 ...state,
                 isAuthenticated: !Validator.isEmpty(action.payload),
                 user: action.payload
             }
         }
        default:
            return state;
    }
}