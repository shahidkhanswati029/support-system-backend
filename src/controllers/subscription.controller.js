import User from "../models/User.model.js";
import asyncHandler from "../middlewares/async.middleware.js";

export const assignSubscription = asyncHandler(async (req, res) => {
  const { email, plan, status } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role === "admin") {
    return res
      .status(400)
      .json({ message: "Admins cannot have subscriptions" });
  }

  user.subscription = { plan, status };
  await user.save();

  res.json({
    message: "Subscription updated",
    subscription: user.subscription,
    user: {
      email: user.email,
      role: user.role,
    },
  });
});
