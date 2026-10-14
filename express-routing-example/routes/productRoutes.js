import express from "express";
import { getProduct, getAllProducts, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProduct);

router.post("/", addProduct);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;