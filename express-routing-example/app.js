import express from "express";
import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoute);
app.use("/products", productRoute);

export default app;