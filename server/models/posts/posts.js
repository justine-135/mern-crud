const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostsSchema = mongoose.Schema(
  {
    id: { type: ObjectId },
    title: { type: String, required: [true, "Please enter title"] },
    body: { type: String, required: [true, "Please enter body"] },
    category: [{ type: String, required: [true, "Please enter category"] }],
    likes: { type: Number, default: 0 },
    tags: [{ type: String, required: [true, "Please enter tag"] }],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
