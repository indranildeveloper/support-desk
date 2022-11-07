import express from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(userController.register);
router.route("/me").get(authMiddleware.protect, userController.getMe);
router.route("/login").post(userController.login);

export default router;
