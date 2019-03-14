'use strict';

let router = require('express').Router();

// Middleware
let middleware = require('./controllers/middleware');
router.use(middleware.doSomethingInteresting);


let product = require('./controllers/product');
let category = require('./controllers/category');
let attribute = require('./controllers/attribute');
let customer = require('./controllers/customer');
let order = require('./controllers/order');


// product routes

/**
 * @api {get} /product/new Find a product
 * @apiGroup Products
 * @apiParam {id}  Product id
 * @apiSuccess {product} created user object
 */

 router.get('/',function(req,res){
   res.send('<h1> IT IS ME </h1>')
 });

// product routes
router.post('/product/new', product.createOne);
router.get('/products', product.findAll);
router.get('/product/:id', product.findOne);
router.put('/product/:id', product.updateOne);
router.delete('/product/:id', product.deleteOne);

// category routes
router.post('/category/new', category.createOne);
router.get('/categorys', category.findAll);
router.get('/category/:id', category.findOne);
router.put('/category/:id', category.updateOne);
router.delete('/category/:id', category.deleteOne);

// order routes
router.post('/order/new', order.createOne);
router.get('/orders', order.findAll);
router.get('/order/:id', order.findOne);
router.put('/order/:id', order.updateOne);
router.delete('/order/:id', order.deleteOne);

// attribute routes
router.post('/attribute/new', attribute.createOne);
router.get('/attributes', attribute.findAll);
router.get('/attribute/:id', attribute.findOne);
router.put('/attribute/:id', attribute.updateOne);
router.delete('/attribute/:id', attribute.deleteOne);

// customer routes
router.post('/customer/new', customer.createOne);
router.get('/customers', customer.findAll);
router.get('/customer/:id', customer.findOne);
router.put('/customer/:id', customer.updateOne);
router.delete('/customer/:id', customer.deleteOne);
router.post('/customer/auth', customer.Authentification);

// Error Handling
let errors = require('./controllers/errors');
router.use(errors.errorHandler);

// Request was not picked up by a route, send 404
router.use(errors.nullRoute);

// Export the router
module.exports = router;
