import express from "express";
import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import { assignSubscription } from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/", protect, authorize("agent","admin"), assignSubscription);

export default router;
