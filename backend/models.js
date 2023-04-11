const { model, Schema } = require('mongoose');

const levelSchema = new Schema(
    {
        value: Number,
        updatedAt: {type: Date, default: ()=>Date.now()}
    },
    {_id: false}
)

module.exports.User = new model('user', Schema(
        {
            username: {type: String, unique: true},
            password: String,
            email: String,
            verified: Boolean,
            emailCode: {value: String, updatedAt: {type: Date, default: ()=> Date.now()}},
            recoveryCode: {value: String, updatedAt: {type: Date, default: ()=> Date.now()}},
            recoveryAuthorized: {value: Boolean, updatedAt: {type: Date, default: ()=> Date.now()}},
            easy: levelSchema,
            medium: levelSchema,
            hard: levelSchema
        }
    )
)