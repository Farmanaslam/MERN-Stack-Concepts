const fs = require("fs");
const express = require("express");
const port = 3000;
const app = express();

app.get("/demo", function (req, res, next) {
  if (
    req.query.name == "farman" &&
    req.query.age == "20" &&
    req.query.subject == "cs"
  ) {
    next();
  } else {
    res.sendStatus(400);
  }
  console.log(req.query); // prints all data in request object
  res.send(JSON.stringify(req.query)); // send back same data in response object
});
app.get("/demo/Youstart/Express/:name/:age/:subject", (req, res, next) => {
  console.log(req.params);
  res.send(req.params);
});
//Body parser middleware to send body of request response
app.use(express.json());
app.post("/demo", (req, res, next) => {
  if (req.body.name == "farman") {
    res.send("Find name= farman in req.body");
    next();
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log("Assignment server started");
});
