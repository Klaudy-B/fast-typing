module.exports.generalErrorHandler = (error, response)=>{
    if(error.errorMessage){
        return response.status(400).json(error.errorMessage);
    }
    console.log(error);
    return response.status(500).end();
}
module.exports.signupErrorHandler = (error, response)=>{
    if(error.code===11000){
        return response.status(401).json({errorFields: {username: `The username ${username} is already taken.`, password1:'', password2: '' }});
    }
    if(error.errorFields){
        return response.status(401).json(error);
    }
    console.log(error);
    return response.status(500).end();
}