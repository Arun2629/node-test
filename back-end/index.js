const express = require('express')
const cors = require('cors')
const multer = require('multer')
const configureDb = require('./config/database')
const app = express()
const port = 3033
require('dotenv').config()

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'uploads')
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + "_" + Date.now() + file.originalname.toLowerCase().split(" ").join("-"))
    }
})

const upload = multer({storage: storage,
fileFilter: (req,file,cb) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
        return cb(new Error("Only png, jpg or jpeg fromat allowed"))
    }
}})

configureDb()

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static('uploads'))

const usersController = require('./app/controllers/usersController')
const {authenticateUser} = require('./app/middlewares/authentication')
const pdfViewer = require("./app/middlewares/pdf-generator")
//register & login
app.post('/users/register', upload.single('image') ,usersController.register)
app.post('/users/login', usersController.login)

//CRUD
app.get('/users', authenticateUser, usersController.list)
app.get('/users/data', authenticateUser, usersController.show)
app.put('/users/:id', authenticateUser, usersController.update)
app.delete('/users/:id', authenticateUser, usersController.delete)

app.get('/users-data-download',  pdfViewer )



app.listen(port, () => {
    console.log("Server is now running on port", port)
})