const { generalErrorHandler } = require('../errorhandlers/authErrorHandlers');
const { User } = require('../models');
const { levels, messages: { _404message } } = require('../helpers');

module.exports.getRecord = async (req, res)=>{
    try{
        if(!levels[req.params.level]){
            return res.status(404).json({error: _404message});
        }
        const record = await User.findOne({username: req.username}).select(req.params.level);
        return res.status(200).json(record[req.params.level]);
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
        if(!levels[req.params.level]){
            return res.status(404).json({error: _404message});
        }
        const user = await User.findOne({username: req.username});
        user[req.params.level] = {value: req.body.newRecord};
        await user.save();
        return res.status(200).json(user[req.params.level]);
    }catch(error){
        generalErrorHandler(error, res);
    }
}