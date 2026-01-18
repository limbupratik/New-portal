
// backend/server.js
import express from "express";
import cors from "cors";
import "dotenv/config"; // loads backend/.env

// Routers that actually exist in your tree:
import newsRouter from "./routes/news.routes.js";
// If you are using auth.js, keep the next line; else comment it out.
import authRouter from "./routes/auth.js";

import adminRouter from "./routes/admin.routes.js";
import { authRequired, adminOnly } from "./middleware/auth.js";

const app = express();

/* ---------- Middleware ---------- */
app.use(cors());
app.use(express.json());

/* ---------- Health Check ---------- */
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

/* ---------- API Routes ---------- */
app.use("/api/news", newsRouter);
// comment out this line if you don't need auth now
app.use("/api/auth", authRouter);
app.use("/api/admin", authRequired, adminOnly, adminRouter);

/* ---------- 404 for unknown API routes ---------- */
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "API route not found" });
  }
  next();
});

/* ---------- Global error handler ---------- */
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  const message =
    err?.response?.data?.message ||
    err?.message ||
    "Internal server error";
  res.status(500).json({ message });
});

/* ---------- Start Server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on :${PORT}`);
});
