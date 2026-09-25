import { writeFileSync, readFileSync } from "fs";
writeFileSync("syncFS.txt", "Example of synchronous file system");

const data = readFileSync("syncFS.txt", "utf8");
console.log(data);