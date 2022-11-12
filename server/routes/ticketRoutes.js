import express from "express";
import ticketController from "../controllers/ticketController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.protect, ticketController.getTickets)
  .post(authMiddleware.protect, ticketController.createTicket);

export default router;
