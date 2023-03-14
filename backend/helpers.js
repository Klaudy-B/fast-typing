const { sign } = require('jsonwebtoken');
const { default: isEmail } = require('validator/lib/isEmail');

const cookiesMaxAge = 365*24*60*60*1000;
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