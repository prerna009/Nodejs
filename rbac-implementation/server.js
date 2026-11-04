import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/authRoute.js";
import employeeRoute from "./routes/employeeRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/employees", employeeRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});