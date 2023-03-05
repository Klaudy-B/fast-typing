const { sign } = require('jsonwebtoken');
const { default: isEmail } = require('validator/lib/isEmail');

const cookiesMaxAge = 365*24*60*60*1000;
module.exports.wordsTotalNumber = 4;
module.exports.setCookie = (res, key, value, maxAge)=>{
    if(maxAge === 'session'){
        res.cookie(key, value, {httpOnly: true, sameSite: 'strict'});
    }else if(maxAge===undefined){
        res.cookie(key, value, {httpOnly: true, maxAge: cookiesMaxAge, sameSite: 'strict'});
    }else{
        res.cookie(key, value, {httpOnly: true, maxAge , sameSite: 'strict'});
    }  
}
module.exports.userValidator = (username, password1, password2, email)=>{
    let errorFields = {username: '', password1: '', password2: '', email: ''};
    if(!username){
        errorFields.username = 'The username field is required.';
    }
    if(!password1){
        errorFields.password1 = 'The password field is required.';
    }
    if(!email){
        errorFields.email = 'The email field is required.';
    }
    if(errorFields.username || errorFields.password1 || errorFields.email){
        throw { errorFields };
    }
    const bool = isEmail(email);
    if(!bool){
        errorFields.email = `${email} is not a valide email.`;
    }
    if(password1.length<4){
        errorFields.password1 = 'Password must have at least 4 characters.';
    }
    if(errorFields.password1|| errorFields.email){
        throw { errorFields };
    }
    if(password1 !== password2){
        errorFields.password2 = 'Password confirmation does not match the password field.';
    }
    if(errorFields.password2){
        throw { errorFields };
    }
}
module.exports.createToken = (id)=>{
    return sign({ id }, process.env.SECRETSTRING, {expiresIn: cookiesMaxAge/1000});
}
module.exports.cookiesMaxAge = cookiesMaxAge;