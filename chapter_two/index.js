const http = require("http");
const fs = require("fs");

//reading files from folder and sending to response
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const products = data.products;
const server = http.createServer((req, res) => {
  console.log("server started");
  //seeing rqst url and method
  console.log(req.url, req.method);

  //setting diiferent type of headers..

  //   res.setHeader('Dummy','Dummy-header')
  //   res.setHeader('Content-Type','application/json')
  //   res.setHeader('Content-Type','text/html')
  
  //res.end sends the response
  //res.end(data);


  if (req.url.startsWith("/products")) {
    const id = req.url.split("/")[2];
    const prd = products.find((p) => p.id === +id);
    console.log(prd);
    res.setHeader("Content-Type", "text/html");
    let modifiedIndex = index
      .replace("**title**", prd.title)
      .replace("**url**", prd.thumbnail)
      .replace("**price**", prd.price)
      .replace("**rating**", prd.rating);
    res.end(modifiedIndex);
    return;
  }

  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end(index);
      break;
    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      break;
    // case '/products':
    //     res.setHeader('Content-Type','text/html')
    //    let modifiedIndex= index.replace('**title**',product.title).replace('**url**',product.thumbnail).replace('**price**',product.price).replace('**rating**',product.rating)
    //     res.end(modifiedIndex)
    //     break
    default:
      res.writeHead("404", "Not Founds");
      res.end();
  }
});
server.listen(5000);
