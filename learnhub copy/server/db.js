//Database
// require("dotenv").config();

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://amanda:8characters@clusterztm.qcjraas.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => console.log("Database Connected"));
