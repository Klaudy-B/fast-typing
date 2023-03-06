const { generalErrorHandler } = require('./errorhandlers/authErrorHandlers');
const { setCookie } = require('./helpers');
const { User } = require('./models');
const { verify } = require('jsonwebtoken');

const verifyUser = async (req, res, next)=>{
    try{
        if(!req.cookies || !req.cookies.fasttyping){
            return res.status(401).end();
        }
        const decodedToken = verify(req.cookies.fasttyping, process.env.SECRETSTRING, (error, decodedToken)=>{
                if(error){
                    setCookie(res, 'fasttyping', '', 1);
                    return res.status(401).end();
                }
                return decodedToken;
            }
        )
        const user = await User.findOne({_id: decodedToken.id}).select('username');
        if(!user){
            setCookie(res, 'fasttyping', '', 1);
            return res.status(401).end();
        }
        setCookie(res, 'fasttyping', req.cookies.fasttyping);
        req.username = user.username;
        next();
    }catch(error){
        generalErrorHandler(error, res);
    }
}

const forgotPasswordMiddleware = (req, res, next)=>{
    try{
        if(req.cookies&&req.cookies.fasttypingloginusername){
            const {id: username} = verify(req.cookies.fasttypingloginusername, process.env.SECRETSTRING, (error, decodedToken)=>{
                if(error){
                    setCookie(res, 'fasttypingloginusername', '', 1);
                    return res.status(401).end();
                }
                return decodedToken;
            })
            const user = User.findOne({username});
            if(!user){
                throw {error: `There is no user named ${username}`};
            }
            req.username = user.username;
            next();
        }
    }catch(error){
        generalErrorHandler(error, res);
    }
    verifyUser(req, res, next);
}

module.exports = { verifyUser, forgotPasswordMiddleware };