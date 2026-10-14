import express from "express";

import { 
    createUser, 
    getUserById, 
    getUsers, 
    updateUser, 
    deleteUser 
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;