const { User } = require('../models');
const { verify } = require('jsonwebtoken');
const { genSalt, hash, compare } = require('bcrypt');
const { createToken, userValidator, setCookie } = require('../helpers');
const {
    signupErrorHandler,
    generalErrorHandler,
} = require('../errorhandlers/authErrorHandlers');
const { default: isEmail } = require('validator/lib/isEmail');
const { createTransport } = require('nodemailer');

module.exports.checkLoginStateController = async (req, res)=>{
    try{
        if(!req.cookies || !req.cookies.fasttyping){
            return res.status(200).json({});
        }
        const decodedToken = verify(req.cookies.fasttyping, process.env.SECRETSTRING, (error, decodedToken)=>{
            if(error){
                setCookie(res, 'fasttyping', '', 1);
                return res.status(400).end();
            }
            return decodedToken;
        });
        const user = await User.findOne({_id: decodedToken.id}).select('username email');
        if(!user){
            setCookie(res, 'fasttyping', '', 1);
            throw { errorMessage:'Token not valid.'};
        }
        setCookie(res, 'fasttyping', req.cookies.fasttyping);
        return res.status(200).json({ user: user.username, verified: user.verified});
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
            email: email,
            verified: false,
            emailCode: 0,
            recoveryCode: 0,
            recoveryAuthorized: false
         }
        const user = await User.create(body);
        const token = createToken(user._id);
        setCookie(res, 'fasttyping', token);
        return res.status(201).json({success: 'Your account has been created successfully.'});
    }catch(error){
        signupErrorHandler(error, res);
    }
}

module.exports.loginController = async (req, res)=>{
    const { username, password } = req.body;
    try{
        if(username){
            const user = await User.findOne({ username });
            if(!user){
                throw {errorFields:{username: `No user named ${username}`}};
            }
            const Token = createToken(username);
            setCookie(res, 'fasttypingloginusername', Token, 'session');
            return res.status(200).json({password: true});
        }
        if(req.cookies&&req.cookies.fasttypingloginusername){
            const {id: username} = verify(req.cookies.fasttypingloginusername, process.env.SECRETSTRING, (error, decodedToken)=>{
                if(error){
                    throw error;
                }
                return decodedToken;
            })
            const user = User.findOne({username});
            if(!user){
                throw {error: `No user named ${username}`};
            }
            const auth = await compare(password, user.password);
            if(!auth){
                throw {errorFields:{password: 'Incorrect password'}};
            }
            const token = createToken(user._id);
            setCookie(res, 'fasttyping', token);
            setCookie(res, 'fasttypingloginusername', '', 1);
            return res.status(201).json({ user: user.username});
        }else{
            return res.status(401).json({error: 'Your session expired.' });
        }
    }catch(error){
        generalErrorHandler(error, res);
    }
}

module.exports.logoutController = (req, res)=>{
    try{
        setCookie(res, 'fasttyping', '', 1);
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
            throw{errorFields: {password: 'Incorrect password.'}};
        }
        if(!username){
            throw {errorFields: {username: 'You have to provide a new username if you want to change yours.'}}
        }
        user.username = username;
        await user.save();
        return res.status(201).json({success: 'Your username has been changed successfully.'});
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
            throw {errorFields: {password1: 'Incorrect password.'} }
        }
        if(!password2){
            throw {errorFields: {password2: 'You have to provide a new password if you want to change yours.'} };
        }
        if(password2.length<4){
            throw { errorFields: {password2: 'The password must have at least 4 characters.'} }
        }
        if(password3 !== password2){
            throw { errorFields: {password3: 'The password confirmation field does not match.'} }
        }
        const salt = await genSalt(10);
        user.password = await hash(password2, salt);
        await user.save();
        return res.status(201).json({success: 'Your password has been changed successfully.'});
    }catch(error){
        signupErrorHandler(error, res);
    }
}

module.exports.changeEmailController = async (req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ username: req.username });
        const auth = compare(password, user.password);
        if(!auth){
            throw { errorFields: {password: 'Incorrect password.'} };
        }
        const bool = isEmail(email);
        if(!bool){
            throw { errorFields: {email: `${email} is not a valide email.`} };
        }
        user.email = email;
        await user.save();
        return res.status(200).json({success: 'your email has been changed successfully.'});
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
            user.emailCode.value = Number(verificationCode);
            await user.save();
            const transporter = createTransport(
                {
                    service: 'gmail',
                    auth: {
                        user: 'fasttypingaddress@gmail.com',
                        pass: 'hjmapqpeaefrvdhi'
                    }
                }
            )
            await transporter.sendMail(
                {
                    from: 'fasttypingaddress@gmail.com',
                    to: `${user.email}`,
                    subject: 'Your email verification code',
                    html: `<b>${verificationCode}</b> is your fast-typing email verification code. This code will expire in 10 minutes.`
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
                return res.status(401).json({error: "You don't have a verification code for this email."});
            }
            const expire = (Date.now()-user.emailCode.updatedAt)/60000;
            if(expire>10){
                return res.status(401).json({error: 'The code has expired.'});
            }
            const { verificationCode } = req.body;
            if(Number(verificationCode) !== user.emailCode.value){
                return res.status(401).json({codeSent: true, noMatch: "The code doesn't match."});
            }
            user.verified = true;
            user.emailCode.value = 0;
            await user.save();
            return res.status(200).json({success: 'Your email is verified!'});
        }catch(error){
            generalErrorHandler(error, res);
        }
    }
}
module.exports.forgotPasswordController = async (req, res)=>{
    if(req.method === 'GET'){
        try{
            const user = await User.findOne({ username: req.username });
            let code = '';
            for(let i=0; i<4; i++){
                code += Math.round( Math.random()*9 ).toString();
            }
            user.recoveryCode = Number(code);
            await user.save();
            const transporter = createTransport(
                {
                    service: 'gmail',
                    auth: {
                        user: 'fasttypingaddress@gmail.com',
                        pass: 'hjmapqpeaefrvdhi'
                    }
                }
            )
            await transporter.sendMail(
                {
                    from: 'fasttypingaddress@gmail.com',
                    to: `${user.email.value}`,
                    subject: 'Your email verification code',
                    html: `<b>${code}</b> is your fast-typing recovery code. This code will expire in 10 minutes.`
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
            if(!user.recoveryCode){
                return res.status(401).json({error: "You don't have a recovery code."});
            }
            const expire = (Date.now()-user.recoveryCode)/60000;
            if(expire>10){
                return res.status(401).json({codeSent: true, error: 'The code has expired.'});
            }
            const { code } = req.body;
            if(Number(code) !== user.recoveryCode){
                return res.status(401).json({codeSent: true, noMatch: "The code doesn't match."});
            }
            user.recoveryAuthorized = true;
            user.recoveryCode = 0;
            await user.save();
            return res.status(200).json({authorized: user.recoveryAuthorized});
        }catch(error){
            generalErrorHandler(error, res);
        }
    }
}
module.exports.recoverPasswordController = async (req, res)=>{
    try{
        const user = await User.findOne({ username: req.username });
        if(!user.recoveryAuthorized){
            return res.status(401).json({error: 'Unauthorized'});
        }
        const { password2, password3 } = req.body;
        if(!password2){
            throw {errorFields: {password2: 'You have to provide a new password if you want to change yours.'} };
        }
        if(password2.length<4){
            throw { errorFields: {password2: 'The password must have at least 4 characters.'} }
        }
        if(password3 !== password2){
            throw { errorFields: {password3: 'The password confirmation field does not match.'} }
        }
        const salt = await genSalt(10);
        user.password = await hash(password2, salt);
        await user.save();
        return res.status(201).json({success: 'Your password has been changed successfully.'});
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