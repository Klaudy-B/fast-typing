const { words, levels, messages: { _404message } } = require('../helpers');
const { generalErrorHandler } = require('../errorhandlers/authErrorHandlers');

const getWords = async (req, res)=>{
    if(!levels[req.params.level]){
        res.status(404).json({error: _404message});
    }
    let wordsNumber = levels[req.params.level].wordsNumber;
    let seconds = levels[req.params.level].seconds;
    try{
        let helperstring = '';
        for(let i=0; i<=(wordsNumber-2); i++){
            helperstring+= words[Math.floor( Math.random()*(words.length))]+' ';
        }
        helperstring+= words[Math.floor( Math.random()*(words.length))];
        return res.status(200).json({charactersList: helperstring.split(''), seconds });
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports = getWords;