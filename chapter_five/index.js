const fs = require("fs");
const express = require("express");
const port = 5000;
const server = express();

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

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
