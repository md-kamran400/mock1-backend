const mongoose= require("mongoose");

const UserSchema = mongoose.Schema({
      email: String,
      password: String,
      confirm_pass: String
})

const UserModle = mongoose.model("user", UserSchema);

module.exports = {UserModle}