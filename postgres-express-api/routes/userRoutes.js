
import { Router } from "express";
const router = Router();

import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.js";

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
