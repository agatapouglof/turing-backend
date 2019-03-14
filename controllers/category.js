'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let CategoryModel = require('../models/category.js');

const Category = CategoryModel(sequelizeConnect, Sequelize)


// get all categorys
exports.findAll = (req, res) => {
    Category.findAll().then(categorys => res.json(categorys))
};

// get category by id
exports.findOne = (req, res) => {
    Category.findByPk(req.params.id).then(categorys => res.json(categorys))
};

// update category by id
exports.updateOne = (req, res, next) => {
    Category.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [category] ]) {
   res.json(category);
 }).catch(next);
};

// create new category
exports.createOne = (req, res) => {
    Category.create(req.body).then(function(category) {
    res.json(category);
 })
};

// delete category by id
exports.deleteOne = (req, res) => {
    Category.destroy({where : {id : req.params.id }}).then(category =>  res.json(category))
};
