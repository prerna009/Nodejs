import { URL } from "url";

const myUrl = new URL("https://example.com/products?id=10&category=mobile");
console.log(myUrl.hostname); // example.com
console.log(myUrl.pathname); // /products
console.log(myUrl.search); // ?id=10&category=mobile

console.log(myUrl.searchParams.get("id")); //10
console.log(myUrl.searchParams.get("category")); //mobile