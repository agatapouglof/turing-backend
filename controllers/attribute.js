'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let AttributeModel = require('../models/attribute.js');

const Attribute = AttributeModel(sequelizeConnect, Sequelize)


// get all attributes
exports.findAll = (req, res) => {
    Attribute.findAll().then(attributes => res.json(attributes))
};

// get attribute by id
exports.findOne = (req, res) => {
    Attribute.findByPk(req.params.id).then(attributes => res.json(attributes))
};

// update attribute by id
exports.updateOne = (req, res, next) => {
    Attribute.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [attribute] ]) {
   res.json(attribute);
 }).catch(next);
};

// create new attribute
exports.createOne = (req, res) => {
    Attribute.create(req.body).then(function(attribute) {
    res.json(attribute);
 })
};

// delete attribute by id
exports.deleteOne = (req, res) => {
    Attribute.destroy({where : {id : req.params.id }}).then(attribute =>  res.json(attribute))
};
