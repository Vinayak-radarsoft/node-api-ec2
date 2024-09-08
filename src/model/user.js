const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, reuqired: true, unique: true },
  password: { type: String, reuqired: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
