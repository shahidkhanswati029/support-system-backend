import User from "../models/User.model.js";
// import userModel from "../models/User.model.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
console.log(user);
  res.status(201).json({
    token: generateToken({ id: user._id }),
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
    },
  });
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Success response
    return res.status(200).json({
      token: generateToken({ id: user._id }),
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
