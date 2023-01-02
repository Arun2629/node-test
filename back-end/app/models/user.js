const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail, isMobilePhone} = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return isMobilePhone(value)
            },
            message: function() {
                return "invalid mobile number"
            }
        }
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

userSchema.pre('save', function(next){
    const user = this

    bcrypt.genSalt(10)
        .then((salt) => {
            bcrypt.hash(user.password, salt)
                .then((encrypted) => {
                    user.password = encrypted
                    next()
                })
        })
})

const User = mongoose.model("User", userSchema)

module.exports = User