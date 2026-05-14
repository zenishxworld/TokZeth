import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import refineRouter from "./routes/refine";
import healthRouter from "./routes/health";
import { errorHandler } from "./middleware/error";

const app = express();
const PORT = parseInt(process.env.PORT ?? "3001", 10);

// ---- Security headers ----
app.use(helmet());

// ---- CORS ----
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, same-origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin "${origin}" not allowed`));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ---- Body parsing ----
app.use(express.json({ limit: "100kb" }));

// ---- Rate limiting ----
app.use(
  "/api/refine",
  rateLimit({
    windowMs: 60 * 1000,    // 1 minute
    max: 30,                 // 30 requests per minute per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: "Too many requests, please slow down." },
  })
);

// ---- Routes ----
app.use("/api/health", healthRouter);
app.use("/api/refine", refineRouter);

// ---- 404 ----
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// ---- Error handler (must be last) ----
app.use(errorHandler);

// ---- Start ----
app.listen(PORT, () => {
  const provider = process.env.ACTIVE_PROVIDER ?? "deepseek";
  console.log(`\n🚀 TokZeth Backend running on http://localhost:${PORT}`);
  console.log(`   Provider: ${provider}`);
  console.log(`   Env:      ${process.env.NODE_ENV ?? "development"}\n`);
});

export default app;
