export const errorMessage = 'There is a problem on the server.';
export const logoutErrorMessage = 'Something went wrong in the logout process.';
export const reducer = (state, action)=>{
    return action;
}
export const setTitle = (title)=>{
    document.title = `${title} | ${import.meta.env.VITE_APP_NAME.charAt(0).toUpperCase()}${import.meta.env.VITE_APP_NAME.slice(1)}`;
}
export const placeholders = {
    username: 'Your username',
    password: 'Your password',
    newPassword: 'Your new password',
    passwordConformation: 'Confirm your password',
    email: 'Your email(xyz@example.com)',
    newEmail: 'Your new email(xyz@example.com)',
    newUsername: 'Your new username',
    verificationCode: "Type in the code you recieved here",
    rememberUsername: "Type in the username you remember",
    newPasswordConfirmation: "Confirm your new password"
}
export const urls = {
    home: '/',
    logout: '/logout',
    deleteAccount: '/delete-account',
    levels: '/levels',
    play: '/play',
    easy: '/easy',
    medium: '/medium',
    hard: '/hard',
    login: '/login',
    password: '/password',
    username: '/username',
    changeEmail: '/change-email',
    verifyEmail: '/verify-email',
    signup: '/signup',
    settings: '/settings',
    forgotPassword: '/forgot-password',
    forgotUsername: '/forgot-username',
    myRecords: '/my-records',
    recoverPassword: '/recover-password',
    backend: {
        records: '/records',
        myRecords: '/my-records',
        personalRecord: '/personal-record',
        setRecord: '/set-record',
        words: '/words'
    }
}