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
            username: {type: String, required: true},
            password: String,
            email:{
                value: String,
                verified: Boolean,
                verificationCode: Number,
                updatedAt: Date
            },
            easy: levelSchema,
            medium: levelSchema,
            hard: levelSchema
        }
    )
)
module.exports.Word = new model('word', new Schema(
        {
            _id: String,
            word: String
        }
    )
)