const fs = require("fs");
const express = require("express");
const port = 5000;
const server = express();

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

//API ROOT,  BASE URL-LOCALHOST.. EX:=WWW.GOOGLE.COM-BASER URL/PRODUCTS
//using getAllProduct func
exports.getAllProduct = (req, res) => {
  res.json(products);
};

//Body parser middleware to send body of request response
server.use(express.json());

//creating CRUD apis
//POST is Create request API example  POST/products using createProduct function
exports.createProduct = (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
};

//GET REQUEST IS READ API here id is params which act as variavble in server  using getProduct function
exports.getProduct = (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const requiredProduct = products.find((p) => p.id == id);
  res.json(requiredProduct);
};

//PUT is UPDATE request API example  PUT/products /:ID using replaceProduct function
exports.replaceProduct = (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const updateProductIndex = products.findIndex((p) => p.id == id);
  products.splice(updateProductIndex, 1, { ...req.body, id: id });
  res.status(201).json(products[updateProductIndex]);
};

//IN PUT REQUEST OBJECT IS OVERIDEN WITH NEW PROPERTIES BUT IN PATCH OBJECT IS JUST UPDATED AT SOME PROPERTY AND RES PROPERTIES ARE SAME AS PREVIOUS using updatteProduct function
exports.updateProduct = (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const updateProductIndex = products.findIndex((p) => p.id == id);
  const updateProduct = products[updateProductIndex];
  products.splice(updateProductIndex, 1, { ...updateProduct, ...req.body });
  res.status(201).json(products[updateProductIndex]);
};

//DELETE is DELETE request API example  PUT/products/:ID
exports.deleteProduct = (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const updateProductIndex = products.findIndex((p) => p.id == id);
  const deletedProduct = products[updateProductIndex];
  products.splice(updateProductIndex, 1);
  res.status(201).json(deletedProduct);
};
