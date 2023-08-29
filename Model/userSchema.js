const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: Boolean,
  },
  email: {
    type: String,
    required: Boolean,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
  },
});

// Hashing password

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model("user", userSchema);
