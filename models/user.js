const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

userSchema.statics.hashPassword = (rawPassword) => {
  return bcrypt.hash(rawPassword, 10);
};

userSchema.methods.comparePassword = function (rawPassword) {
  return bcrypt.compare(rawPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
