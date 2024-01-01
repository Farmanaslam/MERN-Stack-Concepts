const fs = require("fs");
const express = require("express");
const port = 5000;
const server = express();
const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.DB_PASSWARD);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("DB Connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Body parser middleware to send body of request response
server.use(express.json());
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

//Middleware to use express Router in given path in parameter
server.use("/products", productRouter.routes);
server.use("/users", userRouter.routes);

server.listen(port, () => {
  console.log("server started on port", port);
});
