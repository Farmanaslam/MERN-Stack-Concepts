const fs = require("fs");
const express = require("express");
const port = 5000;
const server = express();
const mongoose = require("mongoose");
//Importing mongoose product model.
const model = require("../model/product");
const Product = model.Product;

//API ROOT,  BASE URL-LOCALHOST.. EX:=WWW.GOOGLE.COM-BASER URL/PRODUCTS
//using getAllProduct func
exports.getAllProduct = async (req, res) => {
  const products = await Product.find();
  //const products=await Product.find({price:{$gt:950}})
  res.json(products);
};

//Body parser middleware to send body of request response
server.use(express.json());

//creating CRUD apis
//POST is Create request API example  POST/products using createProduct function
exports.createProduct = async (req, res) => {
  //New Product using model and adding properties
  const product = new Product(req.body);
  //giving properties on object

  //  product.title='Redmi Note 10t 5G'
  //  product.description='5g Mobile'
  //  product.price=1000
  //  product.discountPercentage=12
  //  product.rating=5
  try {
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    if (err) {
      res.status(400).json(err);
    }
  }
  //  console.log(product)
};

//GET REQUEST IS READ API here id is params which act as variavble in server  using getProduct function
exports.getProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const requiredProduct = await Product.findById(id);
  res.json(requiredProduct);
};

//PUT is UPDATE request API example  PUT/products /:ID using replaceProduct function
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  const replacedProduct = await Product.findOneAndReplace(
    { _id: id },
    req.body,
    { new: true }
  );
  res.status(201).json(replacedProduct);
};

//IN PATCH REQUEST OBJECT IS OVERIDEN WITH NEW PROPERTIES BUT IN PATCH OBJECT IS JUST UPDATED AT SOME PROPERTY AND RES PROPERTIES ARE SAME AS PREVIOUS using updatteProduct function
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const updatedProduct = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(201).json(updatedProduct);
};

//DELETE is DELETE request API example  PUT/products/:ID
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await Product.findOneAndDelete(
    { _id: id },
    { new: false }
  );
  res.status(201).json(deletedProduct);
};
