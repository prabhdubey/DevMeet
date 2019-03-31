import Url from "../url";
import Types from "./types";
import axios from 'axios';

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(Url.API_POST, postData)
    .then(res =>
      dispatch({
        type: Types.ADD_POST,
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

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(Url.API_POST)
    .then(res =>
      dispatch({
        type: Types.GET_POSTS,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_POSTS,
        payload: null
      })
    );
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`${Url.API_POST}/${id}`)
    .then(res =>
      dispatch({
        type: Types.GET_POST,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_POST,
        payload: null
      })
    );
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`${Url.API_POST}/${id}`)
    .then(res =>
      dispatch({
        type: Types.DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(Url.API_LIKE_POST(id))
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(Url.API_UNLIKE_POST(id))
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(Url.API_ADD_COMMENT_ON_POST(postId), commentData)
    .then(res =>
      dispatch({
        type: Types.GET_POST,
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

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(Url.API_DELETE_COMMENT_ON_POST(postId, commentId))
    .then(res =>
      dispatch({
        type: Types.GET_POST,
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

// Set loading state
export const setPostLoading = () => {
  return {
    type: Types.POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: Types.CLEAR_ERRORS
  };
};
