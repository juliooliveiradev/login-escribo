const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { signUp, signIn, getUser } = require('../controllers/authController');


router.post('/signup', signUp);
router.post('/signin', signIn);

router.get('/user', authMiddleware, getUser);


module.exports = router;