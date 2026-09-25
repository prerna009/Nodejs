// basic example
const username = "Prerna";
console.log("Hello", username);

// example of commnjs module - 1
import { add, subtract, multiply } from "./math";

console.log(add(2,3));
console.log(subtract(2,3));
console.log(multiply(2,3));

// 2

import { getUser, getUserName } from "./user";
console.log(getUser());
console.log(getUserName());

// example of createserver
import { createServer } from "http";

const server = createServer((req, res) => {
  res.end("Hello from Node.js Server");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});