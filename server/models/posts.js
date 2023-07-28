const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "Please enter title"] },
    body: { type: String, required: [true, "Please enter body"] },
    likes: { type: Number, default: 0 },
    tags: [{ type: String, required: [true, "Please enter tag"] }],
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    email: [{ type: String, ref: "Users" }],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
