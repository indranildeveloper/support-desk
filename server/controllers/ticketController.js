import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import Ticket from "../models/ticketModel";

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc    Get user ticket
// @route   GET /api/tickets/:ticketId
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }

  res.status(200).json(ticket);
});

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description!");
  }

  // Get user using the id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// @desc    Delete user ticket
// @route   DELETE /api/tickets/:ticketId
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @desc    Update user ticket
// @route   PUT /api/tickets/:ticketId
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.ticketId,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

export default {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
