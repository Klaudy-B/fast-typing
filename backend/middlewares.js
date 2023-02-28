const { generalErrorHandler } = require('./errorhandlers/authErrorHandlers');
const { setCookie } = require('./helpers/helpers');
const { User } = require('./models/models');
const { verify } = require('jsonwebtoken');

module.exports.verifyUser = async (req, res, next)=>{
    try{
        if(!req.cookies || !req.cookies.fasttyping){
            return res.status(401).end();
        }
        const decodedToken = verify(req.cookies.fasttyping, process.env.SECRETSTRING, (error, decodedToken)=>{
                if(error){
                    setCookie(res, 'fasttyping', '', 1);
                    return res.status(500).end();
                }
                return decodedToken;
            }
        )
        const user = await User.findOne({_id: decodedToken.id}).select('username');
        if(!user){
            setCookie(res, 'fasttyping', '', 1);
            return res.status(401).end();;
        }
        setCookie(res, 'fasttyping', req.cookies.fasttyping);
        req.username = user.username;
        next();
    }catch(error){
        generalErrorHandler(error, res);
    }
}