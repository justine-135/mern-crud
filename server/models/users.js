const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
