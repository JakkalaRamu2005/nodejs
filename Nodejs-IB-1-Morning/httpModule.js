const http = require("http");  // import http module
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.readFile("./index.html", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>Page Not Found</h1>");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);  // ✅ End the response properly
      }
    });
  } 
  });

server.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
