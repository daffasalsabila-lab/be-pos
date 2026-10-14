import { Router } from "express";
import { createUser, getAllUser, getUserById, updateUser, deleteUser} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/middleware.js";
const router = Router();

router.use(verifyToken);
router.get("/", getAllUser);
// di :id itu buat di postman nyari 
router.get("/:id", getUserById);
// oh ya, kan ada get, post dan lain nya, buat bedain
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;