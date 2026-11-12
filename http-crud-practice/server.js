import http from "http";
import userRoutes from "./routes/userRoute.js";

const server = http.createServer((req, res) => {
    userRoutes(req, res);
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});