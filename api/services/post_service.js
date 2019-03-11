import ResponseMessage from "../lib/constants";
import _ from 'underscore';
import * as Response from "../lib/response";

/**
 * Post Service class to hold business logic
 */
export default class PostService {
    constructor(model) {
        this._model = model;
        _.bindAll(this, 'createPost', 'getPost', 'getAllPosts');
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
}