import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "API routes not found"
    });
});

export default app;