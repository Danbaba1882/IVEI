const express= require('express');
const path = require('path');
const katforexpos=express();
const bodyparser= require('body-parser');
const moment = require('moment');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const ejs = require('ejs');
const database = require('./dbconfig/db');
const Users = require('./models/users');
const Category = require('./models/category');
const Product = require('./models/products');
const Sale = require('./models/sale');


const Schema = mongoose.Schema;
katforexpos.set('view engine', 'ejs');
katforexpos.use(bodyparser.json());
katforexpos.use(express.static(path.resolve(__dirname+'/')));
katforexpos.use(bodyparser.urlencoded({extended: true}));

katforexpos.get('/',function(req,res){
      res.render('login');
    })

    katforexpos.post('/adminlogin', async (req, res)=>{

        console.log(req.body)
        const user = await Users.findOne({username:req.body.username});
        console.log(user)
        const products = await Product.find({});
        const regularProducts = await Product.find({productSection: 'Regular'});
        const VIPProducts = await Product.find({productSection: 'VIP'});
        console.log(user.Section)
        if (!user) return res.send({response: 'user not found'});
        if (req.body.password==user.password && user.status === 'Manager') return res.render('index');
        if (req.body.password==user.password && user.status === 'Cashier' && user.Section === 'VIP') return res.render('cashier_regular', {products: regularProducts, name: user.name});
        if (req.body.password==user.password && user.status === 'Cashier' && user.Section === 'Regular') return res.render('cashier_vip', {products: regularProducts, name: user.name});
        else
        return res.send({response: 'incorrect password'});
    })

    katforexpos.post('/add-user', async (req, res)=>{
console.log('from clinet ',req.body)
        const newUser = new Users ({
            name: req.body.name,
            username: req.body.username,
            status: req.body.role,
            password: req.body.password,
            Section: req.body.section
        })
    
        Users.create(newUser).then((newUser, err)=>{
            console.log(newUser)
    if (err){
        res.send(err)
    }
    else{
        res.send({success: true})
    }
        })
    })

    katforexpos.post('/save-cart', async (req, res)=>{
       console.log(req.body)
                const newSale = new Sale ({
                    sales: req.body.sale,
                    cashier: req.body.cashier,
                    date: req.body.salesDate,
                    total: req.body.total
                })
            
                Sale.create(newSale).then((newSale, err)=>{
                    console.log(newSale)
            if (err){
                res.send(err)
            }
            else{
                res.send({success: true})
            }
                })
            })

    katforexpos.post('/add-category', async (req, res)=>{
        
        const newCategory = new Category ({
            category: req.body.name,
        })
                Category.create(newCategory).then((newCategory, err)=>{
                    console.log(newCategory)
            if (err){
                res.send(err)
            }
            else{
                res.send({success: true})
            }
                })
            })

            katforexpos.post('/add-new-product', async (req, res)=>{
                console.log('from clinet ',req.body)
                        const newProduct = new Product ({
                            productName: req.body.productName,
                            productCategory: req.body.productCategory,
                            productSubmenu: req.body.productSubmenu,
                            costPrice: req.body.costPrice,
                            salesPrice: req.body.salesPrice,
                            Description: req.body.Description,
                            productSection: req.body.productSection,
                            Date: req.body.salesDate
                        })

                        console.log('from client ',req.body)
               
                    
                        Product.create(newProduct).then((newProduct, err)=>{
                            console.log(newProduct)
                    if (err){
                        res.send(err)
                    }
                    else{
                        res.send({success: true})
                    }
                        })
                    })

            katforexpos.get('/add-product', async (req, res)=>{
               const categories = await Category.find({});
               console.log(categories)
                        res.render('newProduct', {category: categories});
                    
                    })

                    katforexpos.get('/all-products', async (req, res)=>{
               const products = await Product.find({});

                        res.render('products', {products: products});
                    
                    })

                    katforexpos.get('/all-sales', async (req, res)=>{
                        const sales = await Sale.find({});
                        console.log(sales)
var total = 0;
                        for (var i = 0; i<sales.length; i++){
                            console.log(sales[i].total)
                            total = total + parseFloat(sales[i].total) 
                        }
                        console.log(total)
                                 res.render('sales', {sale: sales, totalsale: total});
                             })
         
                             katforexpos.get('/all-products', async (req, res)=>{
                        const products = await Product.find({});
         
                                 res.render('products', {products: products});
                             })

                    katforexpos.get('/view-product/:id', async (req, res)=>{
                        console.log(req.params.id)
                        const product = await Product.findOne({_id: req.params.id});
                        const categories = await Category.find({});
                        console.log(product)
                                 res.render('veproduct', {product: product, category: categories});
                             })
                             katforexpos.get('/all-products', async (req, res)=>{
                        const products = await Product.find({});
         
                                 res.render('products', {products: products});
                             })

                             katforexpos.get('/all-sales', (req, res)=>{
                                console.log('gotten')
                                res.render('sales')
                             })

                             katforexpos.get('/shopping-cart', async (req, res)=>{
                                         res.render('cart');
                                     })

                            katforexpos.listen(process.env.PORT || 3000);
                            console.log('Server listening at 127.0.0.1/3000');
