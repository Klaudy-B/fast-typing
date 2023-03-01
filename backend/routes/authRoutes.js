const router = require('express').Router();
const { verifyUser } = require('../middlewares')
const {
    loginController,
    signupController,
    logoutController,
    checkLoginStateController,
    changePasswordController,
    changeUsernameController
} = require('../controllers/authControllers');


router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/change-username', verifyUser, changeUsernameController);
router.post('/change-password', verifyUser, changePasswordController);

router.get('/check-login-state', checkLoginStateController);
router.get('/logout', logoutController);

module.exports = router;