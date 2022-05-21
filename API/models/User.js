const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    UserName: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    IsAdmin: { type: Boolean, default: false },
    Image: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
