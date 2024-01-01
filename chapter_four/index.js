const fs = require("fs");
const express = require("express");
const port = 5000;
const server = express();

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

//API ROOT,  BASE URL-LOCALHOST..
server.get("/products", (req, res) => {
  res.json(products);
});

//Body parser middleware to send body of request response
server.use(express.json());

//creating CRUD apis
//POST is Create request API example  POST/products
server.post("/products", (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
});

//GET REQUEST IS READ API here id is params which act as variavble in server
server.get("/products/:id", (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const requiredProduct = products.find((p) => p.id == id);
  res.json(requiredProduct);
});
//PUT is UPDATE request API example  PUT/products /:ID
server.put("/products/:id", (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const updateProductIndex = products.findIndex((p) => p.id == id);
  products.splice(updateProductIndex, 1, { ...req.body, id: id });
  res.status(201).json(products[updateProductIndex]);
});

//IN PUT REQUEST OBJECT IS OVERIDEN WITH NEW PROPERTIES BUT IN PATCH OBJECT IS JUST UPDATED AT SOME PROPERTY AND RES PROPERTIES ARE SAME AS PREVIOUS
server.patch("/products/:id", (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const updateProductIndex = products.findIndex((p) => p.id == id);
  const updateProduct = products[updateProductIndex];
  products.splice(updateProductIndex, 1, { ...updateProduct, ...req.body });
  res.status(201).json(products[updateProductIndex]);
});

//DELETE is DELETE request API example  PUT/products/:ID
server.delete("/products/:id", (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const updateProductIndex = products.findIndex((p) => p.id == id);
  products.splice(updateProductIndex, 1);
  res.status(201).json(products);
});

server.listen(port, () => {
  console.log("server started on port", port);
});
