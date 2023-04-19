const { generalErrorHandler } = require('./errorhandlers/authErrorHandlers');
const { setCookie } = require('./helpers');
const { User } = require('./models');
const { verify } = require('jsonwebtoken');

const verifyUser = async (req, res, next)=>{
    try{
        if(!req.cookies || !req.cookies[process.env.APP_NAME]){
            return res.status(401).json({error: 'Unauthorized'});
        }
        const decodedToken = verify(req.cookies[process.env.APP_NAME], process.env.SECRETSTRING, (error, decodedToken)=>{
                if(error){
                    setCookie(res, process.env.APP_NAME, '', 1);
                    return res.status(401).end();
                }
                return decodedToken;
            }
        )
        const user = await User.findOne({_id: decodedToken.id}).select('username');
        if(!user){
            setCookie(res, process.env.APP_NAME, '', 1);
            return res.status(401).end();
        }
        setCookie(res, process.env.APP_NAME, req.cookies[process.env.APP_NAME]);
        req.username = user.username;
        next();
    }catch(error){
        generalErrorHandler(error, res);
    }
}

const forgotPasswordMiddleware = async (req, res, next)=>{
    try{
        if(req.cookies&&req.cookies[`${process.env.APP_NAME}loginusername`]){
            const {id: username} = verify(req.cookies[`${process.env.APP_NAME}loginusername`], process.env.SECRETSTRING, (error, decodedToken)=>{
                if(error){
                    setCookie(res, `${process.env.APP_NAME}loginusername`, '', 1);
                    return res.status(401).end();
                }
                return decodedToken;
            })
            const user = await User.findOne({username});
            if(!user){
                throw {error: `There is no user named ${username}.`};
            }
            req.username = user.username;
            next();
        }else{
            await verifyUser(req, res, next);
        }
    }catch(error){
        generalErrorHandler(error, res);
    }
}

module.exports = { verifyUser, forgotPasswordMiddleware };