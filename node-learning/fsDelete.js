import { unlink } from "fs";
unlink("asyncFS.txt", (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("File Deleted");
});