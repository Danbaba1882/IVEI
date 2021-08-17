const mongoose  = require('mongoose')
const schema =  mongoose.Schema;

const category = new schema ({
category: String
})


module.exports = mongoose.model('category', category)