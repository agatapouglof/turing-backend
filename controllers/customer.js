'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let CustomerModel = require('../models/customer.js');

const Customer = CustomerModel(sequelizeConnect, Sequelize)


// get all customers
exports.findAll = (req, res) => {
    Customer.findAll().then(customers => res.json(customers))
};

// get customer by id
exports.findOne = (req, res) => {
    Customer.findByPk(req.params.id).then(customers => res.json(customers))
};

// update customer by id
exports.updateOne = (req, res, next) => {
    Customer.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [customer] ]) {
   res.json(customer);
 }).catch(next);
};

// create new customer
exports.createOne = (req, res) => {
    Customer.create(req.body).then(function(customer) {
    res.json(customer);
 })
};

// delete customer by id
exports.deleteOne = (req, res) => {
    Customer.destroy({where : {id : req.params.id }}).then(customer =>  res.json(customer))
};

// authentificate customer
exports.Authentification = (req, res) => {
  console.log(req.body);
    Customer.findOne({where : {email : req.body.email, password  : req.body.password}}).then(function(customer) {
    res.json(customer);
 })
};
