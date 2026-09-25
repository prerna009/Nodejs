import { readFile } from "fs";
import { join } from "path";

const filePath = join(__dirname, "syncFS.txt");
readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data);
});