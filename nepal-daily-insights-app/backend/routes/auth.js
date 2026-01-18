
// backend/routes/auth.js
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token, user }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Compare with env "admin" credentials
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHash  = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminHash) {
      return res.status(500).json({ message: "Admin credentials are not configured" });
    }

    const emailMatch = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
    const passMatch  = await bcrypt.compare(password, adminHash);

    if (!emailMatch || !passMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Issue JWT
    const token = jwt.sign(
      { sub: adminEmail, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // adjust as needed
    );

    return res.json({
      token,
      user: { email: adminEmail, role: "admin" }
    });
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Login failed" });
  }
});

/**
 * GET /api/auth/me
 * Needs Authorization: Bearer <token>
 * Confirms token and returns the user payload
 */
router.get("/me", (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const [, token] = auth.split(" ");
    if (!token) return res.status(401).json({ message: "Missing token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: payload });
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

export default router;
