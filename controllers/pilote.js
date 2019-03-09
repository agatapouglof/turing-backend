'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let PiloteModel = require('../models/pilote.js');

const Pilote = PiloteModel(sequelizeConnect, Sequelize)


// get all pilotes
exports.findAll = (req, res) => {
    Pilote.findAll().then(pilotes => res.json(pilotes))
};

// get pilote by id
exports.findOne = (req, res) => {
    Pilote.findByPk(req.params.id).then(pilotes => res.json(pilotes))
};

// update pilote by id
exports.updateOne = (req, res, next) => {
    Pilote.update(req.body, {returning: true, where : {id : req.params.id }}).then(function([ rowsUpdate, [pilote] ]) {
   res.json(pilote);
 }).catch(next);
};

// create new pilote
exports.createOne = (req, res) => {
    Pilote.create(req.body).then(function(pilote) {
    res.json(pilote);
 })
};

// delete pilote by id
exports.deleteOne = (req, res) => {
    Pilote.destroy({where : {id : req.params.id }}).then(pilote =>  res.json(pilote))
};
