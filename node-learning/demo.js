import { createServer } from "http";

const server = createServer((req, res) => {
    if(req.url === "/") {
        res.end("Home Page");
    } else if (req.url === "/users") {
        res.end("Users Page");
    } else {
        res.end("Page Not Found");
    }
});

server.listen(3000);