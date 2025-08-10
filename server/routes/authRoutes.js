const express = require('express');
const router = express.Router();

const { signup, login, logOut, getUser } = require('../controllers/authController');
const protect = require('../middlewares/protect');

router.route('/signup')
    .post(signup)
router.route('/login')
    .post(login);
router.route('/logout')
    .post(logOut);
router.route('/me')
    .get(getUser)

module.exports = router;