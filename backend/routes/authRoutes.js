const router = require('express').Router();
const { verifyUser } = require('../middlewares')
const {
    loginController,
    signupController,
    logoutController,
    checkLoginStateController,
    changePasswordController,
    changeUsernameController,
    addEmailController,
    verifyEmailController
} = require('../controllers/authControllers');


router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/change-username', verifyUser, changeUsernameController);
router.post('/change-password', verifyUser, changePasswordController);
router.post('/add-email', verifyUser, addEmailController);
router.post('/verify-email', verifyUser, verifyEmailController);

router.get('/check-login-state', checkLoginStateController);
router.get('/verify-email', verifyUser, verifyEmailController);
router.get('/logout', logoutController);

module.exports = router;