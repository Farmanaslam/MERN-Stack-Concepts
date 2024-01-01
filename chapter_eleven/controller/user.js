const fs = require('fs');
// const index = fs.readFileSync('index.html', 'utf-8');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data.json'), 'utf-8'));
const users = data.users;
const jwt=require('jsonwebtoken')
const  model  = require('../model/user');
const User=model.User
// exports.createUser = (req, res) => {
//   console.log(req.body);
//   const user=new User(req.body)
//   var token = jwt.sign({ email:req.body.email },process.env.JWT_SECRET);
//   user.token=token
//   user.save((err,doc)=>{
//     console.log({err,doc})
//     if(err){
//       res.status(400).json(err);
//     } else{
//       res.status(201).json(doc);
//     }
//   })

// };

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUser = (req, res) => {
  const id = +req.params.id;
  const user = users.find((p) => p.id === id);
  res.json(user);
};
exports.replaceUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  users.splice(userIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};
exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const user = users[userIndex];
  users.splice(userIndex, 1, { ...user, ...req.body });
  res.status(201).json();
};
exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const user = users[userIndex];
  users.splice(userIndex, 1);
  res.status(201).json(user);
};
