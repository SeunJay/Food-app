const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
//const passport = require("passport");

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const foodRoutes = require("./routes/food");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Database successfully connected!"))
  .catch(err => console.log(err));

// const db = require("./config/key").MongoURI;

// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", foodRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
