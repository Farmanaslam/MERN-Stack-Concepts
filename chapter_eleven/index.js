require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const path = require("path");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth");
//console.log('env',process.env.DB_PASSWORD)

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://Farman:Farman%4011@cluster0.dqfgkay.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("database connected");
}
//Schema

//bodyParser
const auth = (req, res, next) => {
  const token = req.get("Authorization").split("Bearer ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};
server.use(cors());
server.use(express.json());
server.use(morgan("default"));

server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/products", auth, productRouter.router);
server.use("/users", auth, userRouter.router);
server.use("/auth", authRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server started");
});
