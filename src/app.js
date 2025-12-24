import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true,              // allow cookies/auth headers
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

app.use(errorHandler);

export default app;
