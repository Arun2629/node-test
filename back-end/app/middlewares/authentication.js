const jwt = require('jsonwebtoken')

const authenticateUser = (req,res,next) => {
    const token = req.headers.authorization

    if(token){
        try{
            const tokenData = jwt.verify(token, process.env.SECRET_KEY_TOKEN)
            req.tokenData = tokenData
            next()
        }catch(e){
            res.json({errors: e})
        }
    }else{
        res.json({errors: 'you need to be logged in'})
    }
}

const authorizeUser = (req,res,next) => {
    if(req.tokenData.role == 'admin'){
        next()
    }else{
        res.json({errors: "unauthorized access"})
    }
}

module.exports = {
    authenticateUser,
    authorizeUser
}