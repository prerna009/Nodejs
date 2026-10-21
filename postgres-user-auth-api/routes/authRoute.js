import { Router } from "express";
const router = Router();

import { register, login } from "../controllers/authController.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticate, (req, res) => {
  res.status(200).json({
    message: "Authenticated successfully",
    user: req.user
  });
});

router.get("/admin", authenticate, authorize("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome, administrator"
  });
});

export default router;