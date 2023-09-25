const mongoose= require("mongoose");

const PostSchema = mongoose.Schema({
      first_name: String,
      last_Name: String,
      emai: String,
      department: String,
      salary: Number
})

const PostModel = mongoose.model("post", PostSchema);

module.exports = {PostModel}