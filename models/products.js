const mongoose  = require('mongoose')
const schema =  mongoose.Schema;

const product = new schema ({
productName: String,
productCategory: String,
productSubmenu: String,
costPrice: String,
salesPrice: String,
Description: String,
productSection: String,
Date: String
})


module.exports = mongoose.model('product', product)