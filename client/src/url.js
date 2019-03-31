export default class Url {
    static get LANDING() {
        return '/';
    }

    static get DASHBOARD() {
        return '/dashboard';
    }

    static get API_REGISTER_USER() {
        return '/api/users/register';
    }

    static get ADD_EXPERIENCE() {
        return '/add-experience';
    }

    static get ADD_EDUCATION() {
        return '/add-education';
    }

    static get API_ADD_EXPERIENCE() {
        return '/api/users/profiles/experience';
    }

    static get API_ADD_EDUCATION() {
        return '/api/users/profiles/education';
    }

    static get REGISTER_USER() {
        return '/register';
    }

    static get CREATE_USER_PROFILE() {
        return '/create-profile';
    }

    static get API_DELETE_ACCOUNT() {
        return '/api/users/profile';
    }

    static get API_LOGIN_USER() {
        return '/api/users/login';
    }

    static get LOGIN_USER() {
        return '/login';
    }

    static get PROFILES() {
        return '/profiles';
    }

    static get PROFILE() {
        return "/profile/:handle";
    }

    static get API_ALL_USERS_PROFILES() {
        return '/api/users/profiles/all';
    }


    static get EDIT_PROFILE() {
        return '/edit-profile';
    }

    static get API_CREATE_PROFILE() {
        return '/api/users/profiles'
    }

    static get API_GET_USER_PROFILE() {
        return '/api/users/profile';
    }

    static get API_DELETE_USER_EXPERIENCE() {
        return '/api/users/profiles/experience';
    }

    static get API_DELETE_USER_EDUCATION() {
        return '/api/users/profiles/education';
    }

    static get API_GET_PROFILE_BY_HANDLE() {
        return '/api/users/profiles/handle';
    }

    static get API_POST() {
        return '/api/posts';
    }

    static  API_LIKE_POST(id) {
        return `/api/posts/${id}/like`;
    }

    static  API_UNLIKE_POST(id) {
        return `/api/posts/${id}/unlike`;
    }

    static  API_ADD_COMMENT_ON_POST(postId) {
        return `/api/posts/${postId}/comment/`;
    }

    static  API_DELETE_COMMENT_ON_POST(postId, commentId) {
        return `/api/posts/${postId}/comment/${commentId}`;
    }

    static get POST_FEED() {
        return '/feed';
    }

    static get POST() {
        return "/post/:id";
    }
};