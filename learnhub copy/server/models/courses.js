const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    postedBy: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    courseImage: { type: Array, required: true },
    level: { type: String },
    price: { type: Number, required: true },
    curriculum: { type: Array },
    promotionalVideo: { type: String },
    subCategory: { type: String },
    category: { type: String },
  },
  {
    timestamps: true,
    collection: "courses",
  }
);

const Courses = mongoose.model("Courses", courseSchema);

module.exports = Courses;
