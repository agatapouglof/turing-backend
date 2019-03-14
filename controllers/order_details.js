'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let Order_detailsModel = require('../models/order_details.js');

const Order_details = Order_detailsModel(sequelizeConnect, Sequelize)


// get all order_detailss
exports.findAll = (req, res) => {
    Order_details.findAll().then(order_detailss => res.json(order_detailss))
};

// get order_details by id
exports.findOne = (req, res) => {
    Order_details.findByPk(req.params.id).then(order_detailss => res.json(order_detailss))
};

// update order_details by id
exports.updateOne = (req, res, next) => {
    Order_details.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [order_details] ]) {
   res.json(order_details);
 }).catch(next);
};

// create new order_details
exports.createOne = (req, res) => {
    Order_details.create(req.body).then(function(order_details) {
    res.json(order_details);
 })
};

// delete order_details by id
exports.deleteOne = (req, res) => {
    Order_details.destroy({where : {id : req.params.id }}).then(order_details =>  res.json(order_details))
};
