const router = require("express").Router();
const Courses = require("../models/courses");
const verifyToken = require("../utils/verifyToken");

//checks if user is authenticated
router.use("/", (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  //returns T or F
  let verification = verifyToken(token);

  if (!verification) {
    res
      .status(401)
      .send({ auth: false, message: "Failed to authenticate user" });
  } else {
    next();
  }
});

//Get all courses
router.route("/").post(async (req, res) => {
  const { ids } = req.body;
  const courses = await Courses.find(ids ? { _id: { $in: ids } } : null);

  if (!courses) {
    return res.status(404).json({ message: "No courses found" });
  }

  return res.status(200).json({ courses });
});

//Get courses by category
router.route("/category").post(async (req, res) => {
  const { category } = req.body;
  const courses = await Courses.find({ category: { $in: category } });

  if (!courses) {
    res.status(404).json({ message: "No courses found" });
  }

  res.status(200).json({ courses });
});

//Adding a course
router.route("/add").post(async (req, res) => {
  const {
    title,
    description,
    category,
    subCategory,
    level,
    promotionalVideo,
    curriculum,
    price,
    email,
    postedBy,
    courseImage,
  } = req.body;

  console.log("body ", req.body);

  const newCourse = new Courses({
    postedBy,
    email,
    title,
    description,
    category,
    courseImage: [courseImage],
    subCategory,
    level,
    price: Number(price),
    curriculum,
    promotionalVideo,
  });

  newCourse
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: `Error: ${err}` });
    });
});

module.exports = router;
