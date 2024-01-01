const fs = require("fs");
const express = require("express");
const port = 5000;
const server = express();
const morgan = require("morgan");

// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
//const products = data.products;


//MIDLEWARE B/W CLIENT AND SERVER
// server.use((req,res,next)=>{
//     console.log(req.hostname,req.method,req.ip,req.get('User-Agent'))
//     next()
// })


//using morgan thrid party middleware
server.use(morgan("default"));

//Body parser middleware to send body of request response
server.use(express.json());
//Body parser middleware to send body of request response
server.use(express.static("public"));

//get reqiest
server.get("/demo", (req, res) => {
  //res.send('<h1>Farman</h1>')
  // res.sendFile('/Users/Farhad/Desktop/MERN/chapter_three/index.html')
  // res.json(products)
  res.status(201).send("201 created by farman");
});

//Authentication MIDLEWARE B/W CLIENT AND SERVER
const auth = (req, res, next) => {
  console.log(req.query);
  console.log(req.body);
  // if(req.query.passward=='123'){
  //    next()
  // }

  //sending passward in req body
  if (req.body.passward == "123") {
    next();
  } else {
    res.sendStatus(401, "Unauthorised");
  }
};

//using auth in all routes
//   server.use(auth)

//API/ENDPOINT/PATH/ROUTE with auth middleware
server.get("/", auth, (req, res) => {
  res.json({
    type: "GET",
  });
});
server.post("/", auth, (req, res) => {
  res.json({
    type: "POST",
  });
});
server.put("/", (req, res) => {
  res.json({
    type: "PUT",
  });
});
server.delete("/", (req, res) => {
  res.json({
    type: "DELETE",
  });
});
server.patch("/", (req, res) => {
  res.json({
    type: "PATCH",
  });
});
server.get("/products/:id",  (req, res) => {
   console.log(req.params)
   res.json({
     type: "GET",
   });
 });

server.listen(port, () => {
  console.log("server started");
});
