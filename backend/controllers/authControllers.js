const { User } = require('../models/models');
const { verify } = require('jsonwebtoken');
const { genSalt, hash, compare } = require('bcrypt');
const { createToken, userValidator, setCookie } = require('../helpers/helpers');
const {
    signupErrorHandler,
    generalErrorHandler
} = require('../errorhandlers/authErrorHandlers');

const checkLoginStateController = async (req, res)=>{
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
        return res.status(200).json({ user: user.username });
    }catch(error){
        generalErrorHandler(error, res);
    }
}
const signupController = async (req, res)=>{
    const { username, password1, password2 } = req.body;
    try{
        userValidator(username, password1, password2);
        const salt = await genSalt(10);
        const password = await hash(password1, salt);
        const user = await User.create({ username, password, easy: {value: 0}, medium: {value: 0}, hard: {value: 0} });
        const token = createToken(user._id);
        setCookie(res, 'fasttyping', token);
        return res.status(201).json({user: user.username});
    }catch(error){
        signupErrorHandler(error, res);
    }
}

const loginController = async (req, res)=>{
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

const logoutController = (req, res)=>{
    try{
        setCookie(res, 'fasttyping', '', 1);
        return res.status(200).end();
    }catch(error){
        generalErrorHandler(error, res);
    }
}

module.exports = { signupController, loginController, logoutController, checkLoginStateController };