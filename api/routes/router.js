import {Router} from 'express';
import UserController from '../controllers/user_controller';
import UserProfileController from '../controllers/user_profile_controller';
import PostController from '../controllers/post_controller';
import User from '../models/user';
import UserProfile from '../models/user_profile';
import Post from '../models/post';
import UserService from "../services/user_service";
import UserProfileService from "../services/user_profile_service";
import PostService from "../services/post_service";
import passport from 'passport';

const router = Router();

// Controllers
const userController = new UserController(new UserService(User));
const userProfileController = new UserProfileController(new UserProfileService(UserProfile));
const postController = new PostController(new PostService(Post));

// ====================================User Routes====================================================================
// Home Route
router.get('/', (req, res) => res.send('Hello!'));
// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/users/test', (req, res) => res.json({msg: 'User Route works'}));

// @route   POST api/users/register
// @desc    Register users route
// @access  Public
router.post('/users/register', userController.register);

// @route   POST api/users/login
// @desc    Login user and Get JWT token route
// @access  Public
router.post('/users/login', userController.login);

// @route   POST api/users/login
// @desc    Login user and Get JWT token route
// @access  Authenticated user
router.get('/users/current', passport.authenticate("jwt", {session: false}), userController.current);


// ====================================Profile Routes====================================================================

// @route   GET api/profiles/test
// @desc    Test profiles route
// @access  Public
router.get('/users/profiles/test', (req, res) => res.json({msg: 'Profile Route works'}));

// @route   GET api/user/profiles/all
// @desc    Get all user profiles
// @access  Public
router.get('/users/profiles/all', userProfileController.getAllUserProfiles);


// @route   GET api/profiles
// @desc    Get current user profile
// @access  Private
router.get('/users/profile/',
    passport.authenticate('jwt', {session: false}),
    userProfileController.getCurrentUserProfile
);

// @route   GET api/profiles/test
// @desc    Test profiles route
// @access  Public
router.get('/users/profiles/:user_id', userProfileController.getUserProfile);

// @route   POST api/user/profiles/
// @desc    Create or Update User Profile
// @access  Public
router.post('/users/profiles', passport.authenticate('jwt', {session: false}), userProfileController.createUserProfile);

// @route   GET api/user/profiles/
// @desc    Get user profile using user handle
// @access  Public
router.get('/users/profiles/handle/:handle', userProfileController.getProfileUsingHandle);

// @route   POST api/user/profiles/
// @desc    Create or Update User Profile
// @access  Public
router.post('/users/profiles/experience',
    passport.authenticate('jwt', {session: false}),
    userProfileController.addUserExperience
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
    '/users/profiles/education',
    passport.authenticate('jwt', { session: false }),
    userProfileController.addUserEducation
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Remove experience from profile
// @access  Private
router.delete(
    '/users/profiles/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    userProfileController.removeUserExperience
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Remove education from profile
// @access  Private
router.delete(
    '/users/profiles/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    userProfileController.removeUserEducation
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Remove education from profile
// @access  Private
router.delete(
    '/users/profile',
    passport.authenticate('jwt', { session: false }),
    userProfileController.deleteCurrentUserProfile
);

// ====================================Posts Routes====================================================================

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/posts/test', (req, res) => res.json({msg: 'Posts Route works'}));

// @route   POST api/posts/
// @desc    Create posts route
// @access  Private
router.post('/posts', passport.authenticate('jwt', { session: false }), postController.create);

// @route   GET api/posts/:id
// @desc    Get post route
// @access  Private
router.get('/posts/:id', passport.authenticate('jwt', { session: false }), postController.getPost);

// @route   GET api/posts
// @desc    Get posts route
// @access  Private
router.get('/posts', passport.authenticate('jwt', { session: false }), postController.getAllPosts);

// @route   DELETE api/posts/:id
// @desc    Remove posts
// @access  Private
router.delete(
    '/posts/:id',
    passport.authenticate('jwt', { session: false }),
    postController.removeUserPost
);

// @route   POST api/posts/:id/like
// @desc    Like post
// @access  Private
router.post(
    '/posts/:id/like',
    passport.authenticate('jwt', { session: false }),
    postController.likePost
);

// @route   POST api/posts/:id/unlike,
// @desc    UnLike post
// @access  Private
router.post(
    '/posts/:id/unlike',
    passport.authenticate('jwt', { session: false }),
    postController.unlikePost
);

// @route   POST api/posts/:id/comment
// @desc    Comment on post
// @access  Private
router.post(
    '/posts/:id/comment',
    passport.authenticate('jwt', { session: false }),
    postController.commentOnPost
);

// @route   DELETE api/posts/:id/comment
// @desc    Remove comment on post
// @access  Private
router.delete(
    '/posts/:id/comment/:comment_id',
    passport.authenticate('jwt', { session: false }),
    postController.removeCommentOnPost
);

export default router;