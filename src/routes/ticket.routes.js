import express from "express";
import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import {
  createTicket,
  getMyTickets,
  getTickets,
  updateTicketStatus,
} from "../controllers/ticket.controller.js";
import { createTicketValidator } from "../validators/ticket.validator.js";
import validate from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/", protect, authorize("user"),createTicketValidator,validate, createTicket);
router.get("/", protect, getTickets);
router.patch(
  "/:id/status",
  protect,
  authorize("admin", "agent"),
  updateTicketStatus
);



router.get("/my-tickets", protect, getMyTickets);
export default router;
