const { User } = require('../models');
const { verify } = require('jsonwebtoken');
const { genSalt, hash, compare } = require('bcrypt');
const { createToken, userValidator, setCookie, messages: {
    invalidToken,
    accountCreated,
    userNotFound,
    incorrectPassword,
    unauthorized,
    accountDeleted,
    sessionExpired,
    provideNewUsername,
    usernameChanged,
    provideNewPassword,
    passwordMinLength,
    passwordsDontMatch,
    passwordChanged,
    emailChanged,
    verificationEmailMessageTitle,
    noRecoveryCode,
    emailNotValid,
    emailVerified,
    codeDoesntMatch,
    codeExpired,
    noEmailCode,
    verificationEmailHTML
} } = require('../helpers');
const {
    signupErrorHandler,
    generalErrorHandler,
} = require('../errorhandlers/authErrorHandlers');
const { default: isEmail } = require('validator/lib/isEmail');
const { createTransport } = require('nodemailer');

module.exports.checkLoginStateController = async (req, res)=>{
    try{
        if(!req.cookies || !req.cookies[process.env.APP_NAME]){
            return res.status(200).json({});
        }
        const { id } = verify(req.cookies[process.env.APP_NAME], process.env.SECRETSTRING, (error, decodedToken)=>{
                if(error){
                    setCookie(res, process.env.APP_NAME, '', 1);
                    return res.status(400).end();
                }
                return decodedToken;
            }
        )
        const user = await User.findOne({_id: id}).select('username verified email');
        if(!user){
            setCookie(res, process.env.APP_NAME, '', 1);
            throw { error: invalidToken};
        }
        setCookie(res, process.env.APP_NAME, req.cookies[process.env.APP_NAME]);
        return res.status(200).json({ user: user.username, verified: user.verified, email: user.email});
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports.forgotPasswordLoaderController = async (req, res)=>{
    try{
        if(!req.cookies ||(!req.cookies[process.env.APP_NAME] && !req.cookies[`${process.env.APP_NAME}loginusername`])){
            return res.status(200).json({});
        }
        if(req.cookies[process.env.APP_NAME]){
            const { id } = verify(req.cookies[process.env.APP_NAME], process.env.SECRETSTRING, (error, decodedToken)=>{
                    if(error){
                        setCookie(res, process.env.APP_NAME, '', 1);
                        return res.status(400).end();
                    }
                    return decodedToken;
                }
            )
            var user = await User.findOne({_id: id}).select('username verified email');
        }
        if(req.cookies[`${process.env.APP_NAME}loginusername`]){
            const { id: username } = verify(req.cookies[`${process.env.APP_NAME}loginusername`], process.env.SECRETSTRING, (error, decodedToken)=>{
                    if(error){
                        setCookie(res, `${process.env.APP_NAME}loginusername`, '', 1);
                        return res.status(400).end();
                    }
                    return decodedToken;
                }
            )
            var user = await User.findOne({username}).select('username verified email');
        }
        if(!user){
            setCookie(res, process.env.APP_NAME, '', 1);
            setCookie(res, `${process.env.APP_NAME}loginusername`, '', 1);
            throw { error: invalidToken};
        }
        if(req.cookies[`${process.env.APP_NAME}loginusername`]){
            return res.status(200).json({ user: user.username, verified: user.verified, email: user.email});
        }
        setCookie(res, process.env.APP_NAME, req.cookies[process.env.APP_NAME]);
        return res.status(200).json({ user: user.username, verified: user.verified, email: user.email});
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports.signupController = async (req, res)=>{
    const { username, password1, password2, email } = req.body;
    try{
        userValidator(username, password1, password2, email);
        const salt = await genSalt(10);
        const password = await hash(password1, salt);
        const body = {
            username,
            password,
            easy: {value: 0},
            medium: {value: 0},
            hard: {value: 0},
            email,
            verified: false,
            emailCode: {value: ''},
            recoveryCode: {value: ''},
            recoveryAuthorized: {value: false}
         }
        const user = await User.create(body);
        const token = createToken(user._id);
        setCookie(res, process.env.APP_NAME, token);
        return res.status(201).json({success: accountCreated});
    }catch(error){
        signupErrorHandler(error, res, username);
    }
}

module.exports.loginController = async (req, res)=>{
    const { username, password } = req.body;
    try{
        if(username){
            const user = await User.findOne({ username });
            if(!user){
                throw {errorFields:{username: userNotFound(username)}};
            }
            const Token = createToken(username);
            setCookie(res, `${process.env.APP_NAME}loginusername`, Token, 'session');
            return res.status(200).json({password: true});
        }
        if(req.cookies&&req.cookies[`${process.env.APP_NAME}loginusername`]){
            const {id: theusername} = verify(req.cookies[`${process.env.APP_NAME}loginusername`], process.env.SECRETSTRING, (error, decodedToken)=>{
                    if(error){
                        throw error;
                    }
                    return decodedToken;
                }
            )
            const user = await User.findOne({username: theusername});
            if(!user){
                throw {error: userNotFound(theusername)};
            }
            const auth = await compare(password, user.password);
            if(!auth){
                throw {errorFields:{password: incorrectPassword}};
            }
            const token = createToken(user._id);
            setCookie(res, process.env.APP_NAME, token);
            setCookie(res, `${process.env.APP_NAME}loginusername`, '', 1);
            return res.status(201).json({ user: user.username});
        }else{
            return res.status(401).json({error: sessionExpired});
        }
    }catch(error){
        signupErrorHandler(error, res);
    }
}

module.exports.logoutController = (req, res)=>{
    try{
        setCookie(res, process.env.APP_NAME, '', 1);
        return res.status(200).end();
    }catch(error){
        generalErrorHandler(error, res);
    }
}

module.exports.changeUsernameController = async (req, res)=>{
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username: req.username});
        const auth = await compare(password, user.password);
        if(!auth){
            throw{errorFields: {password: incorrectPassword}};
        }
        if(!username){
            throw {errorFields: {username: provideNewUsername}};
        }
        user.username = username;
        await user.save();
        return res.status(200).json({success: usernameChanged});
    }catch(error){
        signupErrorHandler(error, res);
    }
}
module.exports.changePasswordController = async (req, res)=>{
    try{
        const { password1, password2, password3 } = req.body;
        const user = await User.findOne({ username: req.username });
        const auth = await compare(password1, user.password);
        if(!auth){
            throw {errorFields: {password1: incorrectPassword} };
        }
        if(!password2){
            throw {errorFields: {password2: provideNewPassword} };
        }
        if(password2.length<4){
            throw { errorFields: {password2: passwordMinLength} };
        }
        if(password3 !== password2){
            throw { errorFields: {password3: passwordsDontMatch} };
        }
        const salt = await genSalt(10);
        user.password = await hash(password2, salt);
        await user.save();
        return res.status(200).json({success: passwordChanged});
    }catch(error){
        signupErrorHandler(error, res);
    }
}

module.exports.changeEmailController = async (req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ username: req.username });
        const auth = await compare(password, user.password);
        if(!auth){
            throw { errorFields: {password: incorrectPassword} };
        }
        const bool = isEmail(email);
        if(!bool){
            throw { errorFields: {email: emailNotValid(email)} };
        }
        if(user.email !== email){
            user.verified = false;
            user.emailCode = {value: ''};
        }
        user.email = email;
        await user.save();
        return res.status(200).json({success: emailChanged});
    }catch(error){
        signupErrorHandler(error, res);
    }
}
module.exports.verifyEmailController = async (req, res)=>{
    if(req.method === 'GET'){
        try{
            const user = await User.findOne({ username: req.username });
            let verificationCode = '';
            for(let i=0; i<4; i++){
                verificationCode += Math.round( Math.random()*9 ).toString();
            }
            const salt = await genSalt(10);
            const hashedVerificationCode = await hash(verificationCode, salt);
            user.emailCode = {value: hashedVerificationCode};
            await user.save();
            const transporter = createTransport(
                {
                    service: process.env.EMAIL_SERVICE,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASS
                    }
                }
            )
            await transporter.sendMail(
                {
                    from: process.env.EMAIL,
                    to: `${user.email}`,
                    subject: verificationEmailMessageTitle,
                    html: verificationEmailHTML(verificationCode)
                }
            )
            return res.status(200).json({codeSent: true});
        }catch(error){
            generalErrorHandler(error, res);
        }
    }
    if(req.method === 'POST'){
        try{
            const user = await User.findOne({ username: req.username });
            if(!user.emailCode.value){
                return res.status(401).json({error: noEmailCode});
            }
            const expire = (Date.now()-user.emailCode.updatedAt)/60000;
            if(expire>=10){
                user.emailCode = {value: ''};
                await user.save();
                return res.status(401).json({codeSent: true, error: codeExpired});
            }
            const { verificationCode } = req.body;
            const auth = await compare(verificationCode, user.emailCode.value);
            if(!auth){
                return res.status(401).json({codeSent: true, noMatch: codeDoesntMatch});
            }
            user.verified = true;
            user.emailCode.value = '';
            await user.save();
            return res.status(200).json({success: emailVerified});
        }catch(error){
            generalErrorHandler(error, res);
        }
    }
}
module.exports.forgotPasswordController = async (req, res)=>{
    if(req.method === 'GET'){
        try{
            console.log(req.username)
            const user = await User.findOne({ username: req.username });
            let code = '';
            for(let i=0; i<4; i++){
                code += Math.round( Math.random()*9 ).toString();
            }
            const salt = await genSalt(10);
            const hashedCode = await hash(code, salt);
            user.recoveryCode = {value: hashedCode};
            await user.save();
            const transporter = createTransport(
                {
                    service: process.env.EMAIL_SERVICE,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASS
                    }
                }
            )
            await transporter.sendMail(
                {
                    from: process.env.EMAIL,
                    to: `${user.email}`,
                    subject: verificationEmailMessageTitle,
                    html: verificationEmailHTML(code)
                }
            )
            return res.status(200).json({codeSent: true});
        }catch(error){
            generalErrorHandler(error, res);
        }
    }
    if(req.method === 'POST'){
        try{
            const user = await User.findOne({ username: req.username });
            if(!user.recoveryCode.value){
                return res.status(401).json({error: noRecoveryCode});
            }
            const expire = (Date.now()-user.recoveryCode.updatedAt)/60000;
            if(expire>=10){
                user.recoveryCode = {value: ''};
                await user.save();
                return res.status(401).json({codeSent: true, error: codeExpired});
            }
            const { verificationCode } = req.body;
            const auth = await compare(verificationCode, user.recoveryCode.value);
            if(!auth){
                return res.status(401).json({codeSent: true, noMatch: codeDoesntMatch});
            }
            user.recoveryAuthorized.value = true;
            user.recoveryCode.value = '';
            await user.save();
            return res.status(200).json({authorized: user.recoveryAuthorized.value});
        }catch(error){
            generalErrorHandler(error, res);
        }
    }
}
module.exports.recoverPasswordController = async (req, res)=>{
    try{
        const user = await User.findOne({ username: req.username });
        if(!user.recoveryAuthorized.value){
            return res.status(401).json({error: unauthorized});
        }
        const { password2, password3 } = req.body;
        if(!password2){
            throw {errorFields: {password2: provideNewPassword} };
        }
        if(password2.length<4){
            throw { errorFields: {password2: passwordMinLength} };
        }
        if(password3 !== password2){
            throw { errorFields: {password3: passwordsDontMatch} };
        }
        const salt = await genSalt(10);
        user.password = await hash(password2, salt);
        user.recoveryAuthorized = {value: false};
        await user.save();
        return res.status(200).json({success: passwordChanged});
    }catch(error){
        signupErrorHandler(error, res);
    }

}
module.exports.forgotUsernameController = async (req, res)=>{
    try{
        const { username } = req.body;
        const usernames = await User.find({username: new RegExp(`${username}`, 'i')}).select('username -_id');
        return res.status(200).json(usernames);
        
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports.deleteAccountController = async (req, res)=>{
   try{
        const { password } = req.body;
        const user = await User.findOne({ username: req.username });
        if(!user){
            setCookie(res, process.env.APP_NAME, '', 1);
            return res.status(401).json({error: unauthorized});
        }
        const auth = await compare(password, user.password);
        if(!auth){
            return res.status(401).json({errorFields: {password: incorrectPassword}});
        }
        await User.findOneAndDelete({username: user.username});
        setCookie(res, process.env.APP_NAME, '', 1);
        return res.status(200).json({success: accountDeleted});
   }catch(error){
    generalErrorHandler(error, res);
   }
}