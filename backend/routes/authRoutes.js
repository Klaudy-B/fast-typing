const router = require('express').Router();
const { verifyUser, forgotPasswordMiddleware } = require('../middlewares');
const {
    loginController,
    signupController,
    logoutController,
    checkLoginStateController,
    changePasswordController,
    changeUsernameController,
    changeEmailController,
    verifyEmailController,
    forgotPasswordController,
    recoverPasswordController,
    forgotUsernameController,
    deleteAccountController,
    forgotPasswordLoaderController
} = require('../controllers/authControllers');

router.get('/check-login-state', checkLoginStateController);
router.get('/verify-email', verifyUser, verifyEmailController);
router.get('/forgot-password', forgotPasswordMiddleware, forgotPasswordController);
router.get('/logout', logoutController);
router.get('/forgot-password-loader', forgotPasswordLoaderController);

router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/verify-email', forgotPasswordMiddleware, verifyEmailController);
router.post('/forgot-password', forgotPasswordMiddleware, forgotPasswordController);
router.post('/recover-password', forgotPasswordMiddleware, recoverPasswordController);
router.post('/forgot-username', forgotUsernameController);

router.patch('/change-username', verifyUser, changeUsernameController);
router.patch('/change-password', verifyUser, changePasswordController);
router.patch('/change-email', verifyUser, changeEmailController);

router.delete('/delete-account', verifyUser, deleteAccountController);

module.exports = router;