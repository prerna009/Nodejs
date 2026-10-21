
import dotenv from "dotenv";

import express from "express";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "100kb" }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "A user with this email already exists"
    });
  }

  if (err.code === "23503") {
    return res.status(400).json({
      success: false,
      message: "Related database record does not exist"
    });
  }

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON body"
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

async function startServer() {
 try {
    await pool.query("SELECT 1");

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log("PostgreSQL connected successfully");
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log("Shutting down server...");

      server.close(async () => {
        await pool.end();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error.message);
    await pool.end();
    process.exit(1);
  }
}

startServer();
