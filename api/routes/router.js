import {Router} from 'express';
import UserController from '../controllers/userController';
import User from '../models/user';
import UserService from "../services/user_service";
import passport from 'passport';

const router = Router();

// Controllers
const userController = new UserController(new UserService(User));

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

router.get('/users/current', passport.authenticate("jwt", {session: false}),userController.current);


// ====================================Profile Routes====================================================================

// @route   GET api/profiles/test
// @desc    Test profiles route
// @access  Public
    router.get('/profiles/test', (req, res) => res.json({msg: 'Profile Route works'}));

// ====================================Posts Routes====================================================================

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/posts/test', (req, res) => res.json({msg: 'Posts Route works'}));


export default router;