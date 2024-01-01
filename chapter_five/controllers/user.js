const fs = require("fs");
const express = require("express");
const port = 5000;
const server = express();

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const users = data.users;

//API ROOT,  BASE URL-LOCALHOST.. EX:=WWW.GOOGLE.COM-BASER URL/PRODUCTS
//using getAllUser func
exports.getAllUser = (req, res) => {
  res.json(users);
};

//Body parser middleware to send body of request response
server.use(express.json());

//creating CRUD apis
//POST is Create request API example  POST/products using createUser function
exports.createUser = (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.status(201).json(req.body);
};

//GET REQUEST IS READ API here id is params which act as variavble in server  using getUser function
exports.getUser = (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const requiredUser = users.find((p) => p.id == id);
  res.json(requiredUser);
};

//PUT is UPDATE request API example  PUT/products /:ID using replaceUser function
exports.replaceUser = (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const updateUserIndex = users.findIndex((p) => p.id == id);
  users.splice(updateUserIndex, 1, { ...req.body, id: id });
  res.status(201).json(users[updateUserIndex]);
};

//IN PUT REQUEST OBJECT IS OVERIDEN WITH NEW PROPERTIES BUT IN PATCH OBJECT IS JUST UPDATED AT SOME PROPERTY AND RES PROPERTIES ARE SAME AS PREVIOUS using updateUser function
exports.updateUser = (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const updateUserIndex = users.findIndex((p) => p.id == id);
  const updateUser = users[updateUserIndex];
  users.splice(updateUserIndex, 1, { ...updateUser, ...req.body });
  res.status(201).json(users[updateUserIndex]);
};

//DELETE is DELETE request API example  PUT/products/:ID
exports.deleteUser = (req, res) => {
  //+ is used to convert int to string
  const id = +req.params.id;
  const deleteUserIndex = users.findIndex((p) => p.id == id);
  const updatedUser = users[deleteUserIndex];
  users.splice(deleteUserIndex, 1);
  res.status(201).json(updatedUser);
};
