'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let ProductModel = require('../models/product.js');

const Product = ProductModel(sequelizeConnect, Sequelize)


// get all products
exports.findAll = (req, res) => {
    Product.findAll().then(products => res.json(products))
};

// get product by id
exports.findOne = (req, res) => {
    Product.findByPk(req.params.id).then(products => res.json(products))
};

// update product by id
exports.updateOne = (req, res, next) => {
    Product.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [product] ]) {
   res.json(product);
 }).catch(next);
};

// create new product
exports.createOne = (req, res) => {
    Product.create(req.body).then(function(product) {
    res.json(product);
 })
};

// delete product by id
exports.deleteOne = (req, res) => {
    Product.destroy({where : {id : req.params.id }}).then(product =>  res.json(product))
};
