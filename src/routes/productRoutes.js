import { Router } from "express";
import { getAllProducts, getOneProducts, createProducts, updateProduct, deleteProduct } from "../controllers/productController.js";


const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getOneProducts);
router.post("/", createProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;