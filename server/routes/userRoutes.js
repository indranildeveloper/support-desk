import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.route("/").post(userController.register);
router.route("/login").post(userController.login);

export default router;
