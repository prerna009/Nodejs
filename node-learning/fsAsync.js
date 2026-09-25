import { writeFile, readFile } from "fs";
writeFile("asyncFS.txt", "Example of asynchronous file system", (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("File written successfully");
});


readFile("asyncFS.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data);
});