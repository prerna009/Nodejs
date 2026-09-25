import { basename as _basename, dirname as _dirname, extname } from "path";

const filePath = "/uploads/images/profile.jpg";

const basename = _basename(filePath);
console.log(basename); // profile.jpg

const dirname = _dirname(filePath);
console.log(dirname); // /uploads/images

const extension = extname(filePath);
console.log(extension); // .jpg