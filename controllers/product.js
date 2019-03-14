'use strict';

const Sequelize = require('sequelize');

let config = require('config');
const { sequelizeConnect } = require('../sequelize')

let ProductModel = require('../models/product.js');

const Product = ProductModel(sequelizeConnect, Sequelize)

let Product_attributeModel = require('../models/product_attribute.js');
const Product_attribute = Product_attributeModel(sequelizeConnect, Sequelize)

let AttributeModel = require('../models/attribute.js');
const Attribute = AttributeModel(sequelizeConnect, Sequelize);

let Attribute_valueModel = require('../models/attribute_value.js');
const Attribute_value = Attribute_valueModel(sequelizeConnect, Sequelize);


// get all products
exports.findAll = (req, res) => {
    // Product_attribute.hasMany(Product, {foreignKey: 'product_id'});
    // Product_attribute.hasMany(Attribute_value, {foreignKey: 'attribute_value_id'});
    // Product_attribute.findAll({include  : [Product,Attribute_value]}).then(products => res.json(products))



    Product_attribute.hasMany(Attribute_value, {foreignKey: 'attribute_value_id'});
    
    Attribute_value.belongsTo(Product_attribute, {foreignKey: 'attribute_value_id'});

    Product.hasMany(Product_attribute, {foreignKey: 'product_id'});

    // Product.hasMany(Attribute_value, {
    //    through :  Product_attribute,
    //    foreignKey: 'product_id'
    //  });

    // Product.belongsToMany(Attribute_value, { through: Product_attribute, foreignKey: 'attribute_value_id' })
    // Product.findAll({include  : [Product_attribute]}).then(products => res.json(products))
    Product.findAll({include  : [Product_attribute]}).then(products => res.json(products))
    // Product.findAll().then(products => res.json(products))
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
