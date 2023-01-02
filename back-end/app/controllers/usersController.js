const { omit } = require('lodash')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersController = {}

usersController.register = (req,res) => {
    const body = req.body
    const url = req.protocol + "://" + req.get('host')
    body.image = url + "/uploads/" + req.file.filename
    const user = new User(body)

    User.find({username: body.username})
        .then((uniqueUser) => {
            if(uniqueUser.length !== 0){
                res.json({errors: "User Already Exist"})
            }else{
                user.save()
                    .then((user) => {
                        const userObj = JSON.parse(JSON.stringify(user))
                        res.json(omit(userObj, ['password']))
                    })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

usersController.login = (req,res) => {
    const {username, password} = req.body

    User.findOne({username: username})
        .then((user) => {
            if(user) {
                bcrypt.compare(password, user.password)
                    .then((result) => {
                        if(result){
                            const token = jwt.sign({id: user._id, username: user.username, role: user.role}, process.env.SECRET_KEY_TOKEN)
                        const userObj = JSON.parse(JSON.stringify(user))
                        res.json({token: token, user: omit(userObj, ['password'])})
                        }else{
                            res.json({errors: 'invalid username or password'})
                        }
                        
                    })
            }else{
                res.json({errors: 'invalid username or password'})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

usersController.list = (req,res) => {
    User.find()
        .then((users) => {
            res.json(users)
        })
        .catch((err) => {
            res.json(err)
        })
}

usersController.show = (req,res) => {
    User.findOne({_id: req.tokenData.id})
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

usersController.update = (req,res) => {
    const id = req.params.id
    const body = req.body

    User.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

usersController.delete = (req,res) => {
    const id = req.params.id

    User.findByIdAndDelete(id)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res,json(err)
        })
}
module.exports = usersController