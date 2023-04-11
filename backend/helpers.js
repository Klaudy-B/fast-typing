const { sign } = require('jsonwebtoken');
const { default: isEmail } = require('validator/lib/isEmail');

const cookiesMaxAge = 365*24*60*60*1000;
module.exports.levels = {
    easy: {value: 'easy', seconds: 60, wordsNumber: 10},
    medium: {value: 'medium', seconds: 60, wordsNumber: 20},
    hard: {value: 'hard', seconds: 40, wordsNumber: 40}
}
module.exports.messages = {
    userNotFound: (username)=>{
        return `There is no user named ${username}.`
    },
    usernameTaken: (username)=>{
        return `The username ${username} is already taken.`
    },
    emailNotValid: (email)=>{
        return `${email} is not a valide email.`
    },
    invalidToken: 'Invalid token.',
    accountCreated: 'Your account has been created sucessfully.',
    incorrectPassword: 'Incorrect password.',
    sessionExpired: 'Your session expired.',
    _404message: 'Resources not found.',
    success: 'success',
    unauthorized: 'unauthorized',
    profilePictureSuccess: 'Profile picture uploaded successfully.',
    noUpload: 'No files were uploaded.',
    provideNewUsername: 'You have to provide a new username if you want to change yours.',
    usernameChanged: 'Your username has been changed successfully.',
    provideNewPassword: 'You have to provide a new password if you want to change yours.',
    passwordMinLength: 'The password must have at least 4 characters.',
    passwordsDontMatch: 'The password confirmation does not match the password you provided.',
    passwordChanged: 'Your password has been changed successfully.',
    emailChanged: 'your email has been changed successfully.',
    verificationEmailMessageTitle: 'Your email verification code',
    noEmailCode: "You don't have a verification code for this email.",
    codeExpired: 'The code has expired.',
    codeDoesntMatch: "The code doesn't match.",
    emailVerified: 'Your email is verified!',
    noRecoveryCode: "You don't have a recovery code.",
    accountDeleted: 'Your account has been deleted successfully.',
    verificationEmailHTML: (verificationCode)=>{
        return `<b>${verificationCode}</b> is your fast-typing email verification code. This code will expire in 10 minutes.`
    }
}
module.exports.setCookie = (res, key, value, maxAge)=>{
    if(maxAge === 'session'){
        res.cookie(key, value, {httpOnly: true, sameSite: 'strict'});
        return;
    }else if(maxAge===undefined){
        res.cookie(key, value, {httpOnly: true, maxAge: cookiesMaxAge, sameSite: 'strict'});
        return;
    }else{
        res.cookie(key, value, {httpOnly: true, maxAge , sameSite: 'strict'});
        return;
    }  
}
module.exports.userValidator = (username, password1, password2, email)=>{
    let errorFields = {username: '', password1: '', password2: '', email: ''};
    if(!username){
        errorFields.username = 'The username is required.';
    }
    if(!password1){
        errorFields.password1 = 'The password is required.';
    }
    if(!email){
        errorFields.email = 'The email is required.';
    }
    if(errorFields.username || errorFields.password1 || errorFields.email){
        throw { errorFields };
    }
    const bool = isEmail(email);
    if(!bool){
        errorFields.email = `${email} is not a valide email.`;
    }
    if(password1.length<4){
        errorFields.password1 = 'The password must have at least 4 characters.';
    }
    if(errorFields.password1|| errorFields.email){
        throw { errorFields };
    }
    if(password1 !== password2){
        errorFields.password2 = 'The password confirmation does not match the password you provided.';
    }
    if(errorFields.password2){
        throw { errorFields };
    }
}
module.exports.createToken = (id)=>{
    return sign({ id }, process.env.SECRETSTRING, {expiresIn: cookiesMaxAge/1000});
}
module.exports.cookiesMaxAge = cookiesMaxAge;
module.exports.words = [
    'i',
    'am',
    'the',
    'coding',
    'god',
    'nobody',
    'can',
    'deny',
    'hackers',
    'worst',
    'nightmare',
    'knowledge',
    'jesus',
    'what',
    'an',
    'app',
    'working',
    'well',
    'now',
    'try',
    'to',
    'set',
    'a',
    'new',
    'record',
    'good',
    'song',
    'sing',
    'nice',
    'get',
    'this',
    'you',
    'make',
    'ten',
    'meals',
    "you're",
    'not',
    'cook',
    'twenty',
    'paintings',
    'artist',
    'but',
    'kill',
    'one',
    'person',
    'verb',
    'random',
    'words',
    'thinking',
    'real',
    'thought',
    'will',
    'notice',
    'voice',
    'love',
    'like',
    'kind',
    'generous',
    'unforgettable',
    'memory',
    'though',
    'thorough'
]