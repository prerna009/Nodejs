import express from "express";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10kb" }));

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON body" });
  }

  res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("Configure a strong JWT_SECRET in .env");
  }

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

startServer().catch((error) => {
  console.error(error.message);
  process.exit(1);
});