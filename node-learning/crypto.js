import crypto from "crypto";

const randomValue = crypto.randomBytes(16);
console.log(randomValue);

const token = randomValue.toString("hex");
console.log(token);