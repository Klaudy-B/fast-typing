const { words } = require('../helpers');
const { generalErrorHandler } = require('../errorhandlers/authErrorHandlers');

const getWords = async (req, res)=>{
    let wordsNumber = 0;
    let seconds = 0;
    switch(req.params.level){
        case 'easy':
            wordsNumber = 10;
            seconds = 60;
            break;

        case 'medium':
            wordsNumber = 20;
            seconds = 60;
            break;

        case 'hard':
            wordsNumber = 40;
            seconds = 40;
            break;

        default:
            res.status(404).json({error: 'Resource not found.'});
    }
    try{
        let helperstring = '';
        for(let i=0; i<=(wordsNumber-2); i++){
            helperstring+= words[Math.floor( Math.random()*(words.length))]+' ';
        }
        helperstring+= words[Math.floor( Math.random()*(words.length))]+'.';
        return res.status(200).json({charactersList: helperstring.split(''), seconds });
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports = getWords;