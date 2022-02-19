import { Router } from "express";
import UserController from "../controller/UserController.js";

const router = Router();
const userController = new UserController();
router.get("/user", userController.index);
router.get("/user/:id", userController.getOne);
router.post("/user", userController.store);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.remove);

export default router;
