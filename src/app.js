import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import errorHandler from "./middlewares/validate.middleware.js";

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://support-system-frontend.vercel.app",
  ],
  credentials: true,
}));

// 🔥 THIS LINE FIXES PENDING REQUESTS ON VERCEL
app.options("*", cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

app.use(errorHandler);

export default app;
