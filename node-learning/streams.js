import fs from "fs";

const stream = fs.createReadStream("asyncFS.txt");

stream.on("data", (chunk) => {
    console.log("Received chunk: ", chunk.length); //34
});

stream.on("end", () => {
    console.log("Finishes");
});