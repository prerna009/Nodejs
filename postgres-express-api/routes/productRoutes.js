import { Router } from "express";
import { addProducts, getProducts } from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.post("/", addProducts);

export default router;