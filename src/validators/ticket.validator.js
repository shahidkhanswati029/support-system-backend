import { body } from "express-validator";

export const createTicketValidator = [
  body("title").notEmpty().withMessage("Title required"),
  body("message").notEmpty().withMessage("Message required"),
];
