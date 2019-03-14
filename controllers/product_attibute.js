'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let Product_attributeModel = require('../models/product_attribute.js');

const Product_attribute = Product_attributeModel(sequelizeConnect, Sequelize)


// get all product_attributes
exports.findAll = (req, res) => {
    Product_attribute.findAll().then(product_attributes => res.json(product_attributes))
};

// get product_attribute by id
exports.findOne = (req, res) => {
    Product_attribute.findByPk(req.params.id).then(product_attributes => res.json(product_attributes))
};

// update product_attribute by id
exports.updateOne = (req, res, next) => {
    Product_attribute.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [product_attribute] ]) {
   res.json(product_attribute);
 }).catch(next);
};

// create new product_attribute
exports.createOne = (req, res) => {
    Product_attribute.create(req.body).then(function(product_attribute) {
    res.json(product_attribute);
 })
};

// delete product_attribute by id
exports.deleteOne = (req, res) => {
    Product_attribute.destroy({where : {id : req.params.id }}).then(product_attribute =>  res.json(product_attribute))
};
