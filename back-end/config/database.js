
const mongoose = require('mongoose')

const configureDb = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/node-test',  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(() => {
            console.log('connected to database')
        })
        .catch((err) => {
            console.log('error connecting to DB', err)
        })
}

module.exports = configureDb
