import express from "express";
import { getAllUsers, getUser, addUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { adminOnly, authMiddleware, validateUser } from "../middleware/middleware.js";

const router = express.Router();

router.use("/", authMiddleware); // router middleware example

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.post("/", validateUser, addUser); // route-specific middleware exmaple

router.patch("/:id", validateUser, updateUser);

router.delete("/:id", authMiddleware, adminOnly, deleteUser);

export default router;