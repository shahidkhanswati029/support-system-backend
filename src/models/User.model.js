import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "agent", "user"],
      default: "user",
    },

    subscription: {
      plan: {
        type: String,
        enum: ["free", "premium"],
        default: "free",
      },
      status: {
        type: String,
        enum: ["active", "expired", "suspended"],
        default: "active",
      },
    },
  },
  { timestamps: true }
);

// ✅ Hash password (CORRECT WAY)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
