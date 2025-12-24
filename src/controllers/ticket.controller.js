import Ticket from "../models/Ticket.model.js";
import asyncHandler from "../middlewares/async.middleware.js";

/**
 * USER → create ticket
 */
export const createTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.create({
    user: req.user._id,
    title: req.body.title,
    message: req.body.message,
  });

  res.status(201).json(ticket);
});

/**
 * USER → own tickets
 * ADMIN/AGENT → all tickets
 */
export const getTickets = asyncHandler(async (req, res) => {
  const filter =
    req.user.role === "user" ? { user: req.user._id } : {};

  const tickets = await Ticket.find(filter)
    .populate("user", "name email role")
    .sort({ createdAt: -1 });

  res.json(tickets);
});

/**
 * ADMIN/AGENT → update status
 */
export const updateTicketStatus = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  ticket.status = req.body.status;
  await ticket.save();

  res.json(ticket);
});



export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};