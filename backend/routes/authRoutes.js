const router = require('express').Router();
const {
    loginController,
    signupController,
    logoutController,
    checkLoginStateController
} = require('../controllers/authControllers');


router.post('/login', loginController);
router.post('/signup', signupController);

router.get('/check-login-state', checkLoginStateController);
router.get('/logout', logoutController);

module.exports = router;