const mongoose  = require('mongoose')
const schema =  mongoose.Schema;

const users = new schema ({
name: String,
username: String,
status: String,
password: String,
Section: String
})


module.exports = mongoose.model('users', users)