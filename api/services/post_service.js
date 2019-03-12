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
        _.bindAll(this, 'createPost', 'getPost', 'getAllPosts', 'removePost');
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
}