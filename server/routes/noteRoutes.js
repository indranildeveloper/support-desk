import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import noteController from "../controllers/noteController";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authMiddleware.protect, noteController.getNotes)
  .post(authMiddleware.protect, noteController.createNote);

export default router;
