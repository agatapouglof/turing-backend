'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let Product_categoryModel = require('../models/product_category.js');

const Product_category = Product_categoryModel(sequelizeConnect, Sequelize)


// get all product_categorys
exports.findAll = (req, res) => {
    Product_category.findAll().then(product_categorys => res.json(product_categorys))
};

// get product_category by id
exports.findOne = (req, res) => {
    Product_category.findByPk(req.params.id).then(product_categorys => res.json(product_categorys))
};

// update product_category by id
exports.updateOne = (req, res, next) => {
    Product_category.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [product_category] ]) {
   res.json(product_category);
 }).catch(next);
};

// create new product_category
exports.createOne = (req, res) => {
    Product_category.create(req.body).then(function(product_category) {
    res.json(product_category);
 })
};

// delete product_category by id
exports.deleteOne = (req, res) => {
    Product_category.destroy({where : {id : req.params.id }}).then(product_category =>  res.json(product_category))
};
