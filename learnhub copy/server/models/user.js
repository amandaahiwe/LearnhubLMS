const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    headline: { type: String },
    description: { type: String },
    website: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    courses: { type: Array },
    draft: { type: Array },
    wishlist: { type: Array },
    profile_pic: { type: String },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
