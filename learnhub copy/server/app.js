require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3310;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route handler
app.get("/", (req, res) => {
  res.send("server up and running");
});

//Routes
const userRoute = require("./routes/user");
const courseRoute = require("./routes/courses");

app.use("/user", userRoute);
app.use("/course", courseRoute);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
