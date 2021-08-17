const mongoose  = require('mongoose')
const schema =  mongoose.Schema;

const sale = new schema ({
    sales: Array,
    cashier: String,
    date: String,
    total: String
})


module.exports = mongoose.model('sale', sale)