import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import Ticket from "../models/ticketModel";

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Tickets" });
});

// @desc    Create
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create Ticket" });
});

export default { getTickets, createTicket };
