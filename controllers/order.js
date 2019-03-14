'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')


let OrderModel = require('../models/orders.js');

const Order = OrderModel(sequelizeConnect, Sequelize);


let Order_detailModel = require('../models/order_detail.js');
// const Order_detail = Order_detailModel(sequelizeConnect, Sequelize);


// get all orders
exports.findAll = (req, res) => {
    Order.findAll().then(orders => res.json(orders))
};

// get order by id
exports.findOne = (req, res) => {
    Order.findByPk(req.params.id).then(orders => res.json(orders))
};

// update order by id
exports.updateOne = (req, res, next) => {
    Order.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [order] ]) {
   res.json(order);
 }).catch(next);
};

// create new order
exports.createOne = (req, res) => {
  // console.log(req.body.user);
  const cart = req.body.cart;
  const user = req.body.user ;
  const total = parseFloat(req.body.totalAmount.toFixed(2))
  // console.log(total);
  Order.create({
      total_amount : total,
      created_on : new Date(),
      customer_id : req.body.user.customer_id,
    }).then(function(order) {
      console.log(order);
      // Order_detail.bulkCreate(req.cart)
    res.json(order);
  })
};

// delete order by id
exports.deleteOne = (req, res) => {
    Order.destroy({where : {id : req.params.id }}).then(order =>  res.json(order))
};
