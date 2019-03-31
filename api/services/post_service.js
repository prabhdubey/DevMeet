import ResponseMessage from "../lib/constants";
import _ from 'underscore';
import * as Response from "../lib/response";
import UserProfile from '../models/user_profile';

/**
 * Post Service class to hold business logic
 */
export default class PostService {
    constructor(model) {
        this._model = model;
        _.bindAll(this, 'createPost', 'getPost', 'getAllPosts', 'removePost', 'likePost', 'unlikePost', 'commentOnPost',
            'removeCommentOnPost');
    }

    createPost(req) {
        const newPost = new this._model({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

        return newPost.save()
            .then(post => Response.createResponse(post))
            .catch(err => console.log(err));
    }

    /**
     * Method to get post of given id
     *
     * @param req Request
     *
     * @returns {Promise<any | never>}
     */
    getPost(req) {
        return this._model.findById(req.params.id)
            .then(post => {
                if (post) {
                    return Response.createResponse(post);
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.POSTS_NOT_FOUND, 404);
            })
            .catch(err => console.log(err))
    }

    /**
     * Method to Get all Posts
     *
     * @returns {Promise<T | never>}
     */
    getAllPosts() {
        return this._model.find()
            .sort({date: -1})
            .then(posts => {
                if (posts) {
                    return Response.createResponse(posts);
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.POST_NOT_FOUND, 404);
            })
            .catch(err => console.log(err))
    }

    /**
     * Method to remove post for give id
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    removePost(req) {
        return UserProfile.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    return this._model.findById(req.params.id)
                        .then(post => {
                            if (post) {
                                if (post.user.toString() === req.user.id) {
                                    return post.remove()
                                        .then(() => {
                                            return Response.createResponse(null, ResponseMessage.ResponseSuccess.POST_REMOVED_SUCCESSFULLY);
                                        })
                                }
                                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.UNAUTHORIZED_USER, 401);
                            }
                            return Response.createResponse(null, null, ResponseMessage.ResponseErrors.POST_NOT_FOUND, 404);
                        })
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
            });
    }

    /**
     * Method to like post for give id
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    likePost(req) {
        return UserProfile.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    return this._model.findById(req.params.id)
                        .then(post => {
                            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                                return Response.createResponse(
                                    null, null, ResponseMessage.ResponseErrors.ALREADY_LIKED_POST, 400
                                );
                            }
                            post.likes.unshift({user: req.user.id});
                            return post.save().then(post => {
                                return Response.createResponse(post, ResponseMessage.ResponseSuccess.POST_LIKED_SUCCESSFULLY);
                            })
                        })
                        .catch(err => console.log(err));
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
            });
    }

    /**
     * Method to unlike post for give id
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    unlikePost(req) {
        return UserProfile.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    return this._model.findById(req.params.id)
                        .then(post => {
                            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                                return Response.createResponse(
                                    null, null, ResponseMessage.ResponseErrors.POST_NOT_LIKED_YET, 400
                                );
                            }
                            // Get remove index
                            const removeIndex = post.likes
                                .map(item => item.user.toString())
                                .indexOf(req.user.id);

                            // Splice out of array
                            post.likes.splice(removeIndex, 1);

                            return post.save().then(post => {
                                return Response.createResponse(post, ResponseMessage.ResponseSuccess.POST_UNLIKED_SUCCESSFULLY);
                            })
                        })
                        .catch(err => console.log(err));
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
            });
    }

    /**
     * Method to comment on post for give id
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    commentOnPost(req) {
        return UserProfile.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    return this._model.findById(req.params.id)
                        .then(post => {
                            const newComment = {
                                text: req.body.text,
                                name: req.body.name,
                                avatar: req.body.avatar,
                                user: req.user.id
                            };

                            console.log(post);
                            console.log("=========================================");
                            // Add to comments array
                            post.comments.unshift(newComment);

                            return post.save().then(post => {
                                console.log("=========================================");
                                console.log(post);
                                return Response.createResponse(post);
                            })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
            });
    }

    /**
     * Method to comment on post for give id
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    removeCommentOnPost(req) {
        return UserProfile.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    return this._model.findById(req.params.id)
                        .then(post => {
                            // Check to see if comment exists
                            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id)
                                .length === 0) {
                                return Response.createResponse(
                                    null, null, ResponseMessage.ResponseErrors.COMMENT_NOT_FOUND, 404
                                );
                            }
                            // Get remove index
                            const removeIndex = post.comments
                                .map(item => item._id.toString())
                                .indexOf(req.params.comment_id);

                            // Splice comment out of array
                            post.comments.splice(removeIndex, 1);

                            return post.save().then(post => {
                                return Response.createResponse(post, ResponseMessage.ResponseSuccess.COMMENT_REMOVED_SUCCESSFULLY);
                            })
                        })
                        .catch(err => console.log(err));
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
            });
    }
}