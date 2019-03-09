'use strict';

let router = require('express').Router();

// Middleware
let middleware = require('./controllers/middleware');
router.use(middleware.doSomethingInteresting);


let product = require('./controllers/product');


// users routes

/**
 * @api {get} /user/new Find a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * @apiSuccess {user} created user object
 */

 router.get('/',function(req,res){
   res.send('<h1> IT IS ME </h1>')
 });


router.post('/product/new', product.createOne);
router.get('/products', product.findAll);
router.get('/product/:id', product.findOne);
router.put('/product/:id', product.updateOne);
router.delete('/product/:id', product.deleteOne);

// Error Handling
let errors = require('./controllers/errors');
router.use(errors.errorHandler);

// Request was not picked up by a route, send 404
router.use(errors.nullRoute);

// Export the router
module.exports = router;
