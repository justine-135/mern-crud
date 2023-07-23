const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsersSchema = mongoose.Schema(
  {
    id: { type: ObjectId },
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
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
