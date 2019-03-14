'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let Attribute_valueModel = require('../models/attribute_value.js');

const Attribute_value = Attribute_valueModel(sequelizeConnect, Sequelize)


// get all attribute_values
exports.findAll = (req, res) => {
    Attribute_value.findAll().then(attribute_values => res.json(attribute_values))
};

// get attribute_value by id
exports.findOne = (req, res) => {
    Attribute_value.findByPk(req.params.id).then(attribute_values => res.json(attribute_values))
};

// update attribute_value by id
exports.updateOne = (req, res, next) => {
    Attribute_value.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [attribute_value] ]) {
   res.json(attribute_value);
 }).catch(next);
};

// create new attribute_value
exports.createOne = (req, res) => {
    Attribute_value.create(req.body).then(function(attribute_value) {
    res.json(attribute_value);
 })
};

// delete attribute_value by id
exports.deleteOne = (req, res) => {
    Attribute_value.destroy({where : {id : req.params.id }}).then(attribute_value =>  res.json(attribute_value))
};
