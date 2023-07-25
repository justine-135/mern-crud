const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = mongoose.Schema(
  {
    comment: { type: String, required: [true, "Please enter comment"] },
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    email: [{ type: String, ref: "Users" }],
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
