const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data", "users.json");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/users") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Server Error");
        return;
      }

      res.setHeader("Content-Type", "application/json");

      res.end(data);
    });

    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});