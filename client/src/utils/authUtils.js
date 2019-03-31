import axios from 'axios';

export default class AuthUtils {

   static setAuthToken(token) {
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }
}