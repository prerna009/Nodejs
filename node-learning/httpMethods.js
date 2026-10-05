import http from "http";

const users = [
    {
        id: 1,
        name: "Prerna",
    },
    {
        id: 2,
        name: "Jyoti",
    }
];

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/users") {
        sendJson(res, 200, users);

        const url = new URL(
            req.url,
            "http://localhost:3000"
        );

        console.log(url.pathname); // /users
        // console.log(url.searchParams.get("page")); // 1
        // console.log(url.searchParams.get("limit")); // 10

        return;
    }

    if (req.method === "POST" && req.url === "/users") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);

                const newUser = {
                    id: users.length + 1,
                    name: data.name,
                };

                users.push(newUser);
                sendJson(res, 201, newUser);
            } catch (error) {
                sendJson(res, 400, {
                    message: "Invalid JSON"
                });
            }
        });

        return;
    }

    sendJson(res, 404, {
        message: "Route Not Found"
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});