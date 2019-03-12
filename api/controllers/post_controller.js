import _ from 'underscore';
import validatePostInput from '../validations/post_validator';

/**
 * PostController class containing post related actions
 */
export default class PostController {
    constructor(postService) {
        this.postService = postService;
        _.bindAll(this, 'create', 'getPost', 'getAllPosts', 'removeUserPost');
    }

    /**
     * Create post for the user
     *
     * @param req Request
     * @param res Response
     */
    create(req, res) {
        const {errors, isValid} = validatePostInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        this.postService.createPost(req).then(postResponse => {
            if (postResponse.error) {
                return res.status(postResponse.status).json(postResponse);
            }
            return res.status(postResponse.status).json(postResponse);
        });
    }

    /**
     * Get Post for given id
     *
     * @param req
     * @param res
     */
    getPost(req, res) {
        this.postService.getPost(req).then(postResponse => {
            if (postResponse.error) {
                return res.status(postResponse.status).json(postResponse);
            }
            return res.status(postResponse.status).json(postResponse);
        });
    }

    /**
     * Get All Posts
     *
     * @param req
     * @param res
     */
    getAllPosts(req, res) {
        this.postService.getAllPosts().then(postResponse => {
            if (postResponse.error) {
                return res.status(postResponse.status).json(postResponse);
            }
            return res.status(postResponse.status).json(postResponse);
        });
    }

    /**
     * Delete post for the given id
     *
     * @param req Request
     * @param res Response
     */
    removeUserPost(req, res) {
        this.postService.removePost(req).then(postResponse => {
            if (postResponse.error) {
                return res.status(postResponse.status).json(postResponse);
            }
            return res.status(postResponse.status).json(postResponse);
        });
    }
}
