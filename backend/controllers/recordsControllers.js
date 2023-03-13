const { generalErrorHandler } = require('../errorhandlers/authErrorHandlers');
const { User } = require('../models');

module.exports.getRecord = async (req, res)=>{
    try{
        if((req.params.level!=='easy')&&(req.params.level!=='medium')&&(req.params.level!=='hard')){
            return res.status(404).json({error: 'Resource not found.'});
        }
        const record = await User.findOne({username: req.username}).select(req.params.level);
        switch(req.params.level){
            case 'easy':
                return res.status(200).json(record.easy);
            case 'medium':
                return res.status(200).json(record.medium);
            case 'hard':
                return res.status(200).json(record.hard);
        }
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports.myRecordsController = async (req, res)=>{
    try{
        const records = await User.findOne({username: req.username}).select('easy medium hard -_id');
        return res.status(200).json(records);
    }catch(error){
        generalErrorHandler(error, res);
    }
}

module.exports.setRecord = async (req, res)=>{
    try{
        if((req.params.level!=='easy')&&(req.params.level!=='medium')&&(req.params.level!=='hard')){
            return res.status(404).json({error: 'Resource not found.'});
        }
        const user = await User.findOne({username: req.username});
        user[req.params.level] = {value: req.body.newRecord};
        await user.save();
        return res.status(201).json(user[req.params.level]);
    }catch(error){
        generalErrorHandler(error, res);
    }
}