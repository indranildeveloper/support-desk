import express from "express";
import ticketController from "../controllers/ticketController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.protect, ticketController.getTickets)
  .post(authMiddleware.protect, ticketController.createTicket);

router
  .route("/:ticketId")
  .get(authMiddleware.protect, ticketController.getTicket)
  .put(authMiddleware.protect, ticketController.updateTicket)
  .delete(authMiddleware.protect, ticketController.deleteTicket);

export default router;
