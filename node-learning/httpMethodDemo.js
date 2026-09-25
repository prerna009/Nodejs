import { createServer } from "http";

const server = createServer((req, res) => {
    if(req.method === "GET" && req.url === "/users") {
        res.end("Get Users");
    } else if (req.method === "POST" && req.url === "/users") {
        res.end("Create User");
    } else {
        res.end("Not Found");
    }
});

server.listen(3000);