import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://support-system-frontend.vercel.app",
  "https://support-system-frontend-lo0uuick9-shahidkhanswati029s-projects.vercel.app"
];

appapp.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.includes(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

app.use(errorHandler);

export default app;
