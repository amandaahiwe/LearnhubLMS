const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/verifyToken");
require("dotenv").config();

const JWT_KEY = "key";

//checks localhost/user/
router.use("/", (req, res, next) => {
  if (req.url === "/login" || req.url === "/register") {
    next();
  } else {
    let token = req.headers["authorization"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });

    let verification = verifyToken(token);

    if (!verification) {
      res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate user" });
    } else {
      next();
    }
  }
});

//Register user
router.route("/register").post(async (req, res) => {
  const { fullname, email, password } = req.body;

  //encrypting password using bcrypt
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullname,
    email,
    password: encryptedPassword,
  });

  newUser
    .save()
    .then((user) => {
      //siging token with user id and secret key
      let token = jwt.sign({ id: user._id }, JWT_KEY);
      // console.log(result);
      res.json({
        token,
        user: {
          email: user.email,
          fullname: user.fullname,
          profile_pic: user.profile_pic,
          id: user._id,
          headline: user.headline,
          description: user.description,
          website: user.website,
          twitter: user.twitter,
          facebook: user.facebook,
          linkedin: user.linkedin,
          youtube: user.youtube,
          courses: user.courses,
          draft: user.draft,
          wishlist: user.wishlist,
        },
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

const verifyUserLogin = async (email, password) => {
  //find users mail in db
  const user = await User.findOne({ email });
  if (!user) {
    return { status: "error", code: 404, message: "User not found" };
  }
  //compare pwd to hashed pwd
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: "error", code: 400, message: "Incorrect password" };
  }
  //sign the user id with the secret key to gen a new token
  let token = jwt.sign({ id: user._id }, JWT_KEY);
  return {
    token,
    user: {
      email: user.email,
      fullname: user.fullname,
      profile_pic: user.profile_pic,
      id: user._id,
      headline: user.headline,
      description: user.description,
      website: user.website,
      twitter: user.twitter,
      facebook: user.facebook,
      linkedin: user.linkedin,
      youtube: user.youtube,
      courses: user.courses,
      draft: user.draft,
      wishlist: user.wishlist,
    },
  };
};

//Login user
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  const { token, user, status, message, code } = await verifyUserLogin(
    email,
    password
  );
  if (status === "error") {
    return res.status(code).json({ status, message });
  }
  return res.json({ token, user, status });
});

//Get user(s) by id
router.route("/").post(async (req, res) => {
  const { ids } = req.body;

  const users = await User.find(ids ? { _id: { $in: ids } } : null);
  if (!users) {
    return res.status(404).json("User not found");
  }

  let usersFromDB = [];

  users.map((user) => {
    return usersFromDB.push({
      email: user.email,
      fullname: user.fullname,
      profile_pic: user.profile_pic,
      id: user._id,
      headline: user.headline,
      description: user.description,
      website: user.website,
      twitter: user.twitter,
      facebook: user.facebook,
      linkedin: user.linkedin,
      youtube: user.youtube,
      courses: user.courses,
      draft: user.draft,
      wishlist: user.wishlist,
    });
  });

  return res.json(usersFromDB);
});

//Edit user details
// router.route("/edit").post(upload.array("image"), async (req, res) => {
//   const { user_id, fullname } = req.body;

//   let urls = [];

//   req.files.map((url) => {
//     urls.push(url.path);
//   });

//   const users = await User.findByIdAndUpdate(
//     user_id,
//     { profile_pic: urls[0], fullname },
//     { new: true }
//   );

//   if (!users) {
//     return res.status(404).json("User not found");
//   }

//   users
//     .save()
//     .then((_data) => {
//       return res.json(_data);
//     })
//     .catch((error) => {
//       return res.status(404).json({ message: "error", error });
//     });
// });

module.exports = router;
