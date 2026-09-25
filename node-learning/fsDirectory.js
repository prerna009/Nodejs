import { mkdir, existsSync } from "fs";
mkdir("uploads", (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Folder created");
});

const t = existsSync("syncFS.txt"); // if file present true else false
console.log(t);