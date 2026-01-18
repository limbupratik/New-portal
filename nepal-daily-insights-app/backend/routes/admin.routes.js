
// backend/routes/admin.routes.js
import { Router } from "express";

const router = Router();

/**
 * Example protected admin endpoint
 * GET /api/admin/overview
 */
router.get("/overview", async (_req, res) => {
  // You can compute and return app metrics here
  return res.json({
    status: "ok",
    message: "Admin overview",
    serverTime: new Date().toISOString()
  });
});

export default router;
