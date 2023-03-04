const { User } = require('../models/models');
const { verify } = require('jsonwebtoken');
const { genSalt, hash, compare } = require('bcrypt');
const { createToken, userValidator, setCookie } = require('../helpers/helpers');
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
        const user = await User.findOne({_id: decodedToken.id}).select('username');
        if(!user){
            setCookie(res, 'fasttyping', '', 1);
            throw { errorMessage:'Token not valid.'};
        }
        setCookie(res, 'fasttyping', req.cookies.fasttyping);
        return res.status(200).json({ user: user.username, verified: user.email.verified});
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
        const body = { username, password, easy: {value: 0}, medium: {value: 0}, hard: {value: 0}, email: {value: email, verified: false, verificationCode: 0, updatedAt: Date.now()} };
        const user = await User.create(body);
        const token = createToken(user._id);
        setCookie(res, 'fasttyping', token);
        return res.status(201).json({success: 'Your account have been created successfully.'});
    }catch(error){
        signupErrorHandler(error, res);
    }
}

module.exports.loginController = async (req, res)=>{
    const { username, password } = req.body;
    try{
        const user = await User.findOne({ username });
        if(!user){
            throw {errorMessage: `No user named ${username}`};
        }
        const auth = await compare(password, user.password);
        if(!auth){
            throw {errorMessage: 'Incorrect password'};
        }
        const token = createToken(user._id);
        setCookie(res, 'fasttyping', token);
        return res.status(200).json({ user: user.username});
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
        const { password1, password2 } = req.body;
        const user = await User.findOne({ username: req.username });
        const auth = await compare(password1, user.password);
        if(!auth){
            throw {errorFields: {password1: 'Incorrect password.'}}
        }
        if(!password2){
            throw {errorFields: {password2: 'You have to provide a new password if you want to change yours.'}};
        }
        if(password2.length<4){
            throw { errorFields: {password2: 'The password must have at least 4 characters.'}}
        }
        const salt = await genSalt(10);
        user.password = await hash(password2, salt);
        await user.save();
        return res.status(201).json({success: 'Your password has been changed successfully.'});
    }catch(error){
        signupErrorHandler(error, res);
    }
}

module.exports.changeEmailcontroller = async (req, res)=>{
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
        user.email = {value: email, verified: false, verificationCode: 0, updatedAt: Date.now()};
        await user.save();
        return res.status(200).json({success: 'your email has been changed successfully.'});
    }catch(error){
        signupErrorHandler(error, res);
    }
}
module.exports.verifyEmailController = async (req, res)=>{
    if(req.method === 'get'){
        try{
            const user = await User.findOne({ username: req.username });
            let verificationCode = '';
            for(let i=0; i<4; i++){
                verificationCode += Math.round( Math.random()*10 );
            }
            user.email.verificationCode = verificationCode;
            await user.save();
            createTransport(
                {
                    service: 'gmail',
                    auth: {
                        user: 'fasttypingaddress@gmail.com',
                        pass: 'fasttypingadmin'
                    }
                }
            ).sendMail(
                {
                    from: 'fasttypingaddress@gmail.com',
                    to: `${user.email.value}`,
                    subject: 'Your email verification code',
                    text: `${verificationCode} is your fast-typing email verification code. This code will expire in 10 minutes.`
                }, (error, info)=>{
                    if(error){
                        throw error;
                    }
                    return;
                }
            )
            const emailToken = createToken(user.email.value);
            setCookie(res, 'fasttypingemailverification', emailToken, 10*60*1000);
            return res.status(200).json({codeSent: true});
        }catch(error){
            generalErrorHandler(error, res);
        }
    }
    if(req.method === 'post'){
        try{
            if(!req.cookies.fasttypingemailverification){
                return res.status(401).json({error: 'The code has expired.'});
            }
            const user = await User.findOne({ username: req.username });
            if(!user.email.verificationCode){
                return res.status(401).json({error: "You don't have a verification code for this email."});
            }
            const { verificationCode } = req.body;
            if(verificationCode !== user.email.verificationCode){
                return res.status(401).json({codeSent: true, noMatch: "The code didn't match."});
            }
            user.email.verified = true;
            await user.save();
            return res.status(200).json({success: 'Your email is verified!'});
        }catch(error){
            generalErrorHandler(error, res);
        }
    }
}