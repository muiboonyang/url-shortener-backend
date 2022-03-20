//////////////////////////////
// Backend (Express):
//////////////////////////////

const connectDB = require("./models/db");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

// Config
dotenv.config();
const mongoURI = process.env.MONGO_URI;
// const mongoURI = "mongodb://localhost:27017/urlshortener";
connectDB(mongoURI);

// =======================================
//                MIDDLEWARE
// =======================================

const app = express();

// body parser middleware
app.use(cors()); // overcomes cors issue
app.use(express.json()); // allows res.body to work (express.json lets you read the req.body in json)
app.use(express.urlencoded({ extended: false })); // allows you to read what the forms send over (by default, it's all encoded), just declare it
app.use(express.static("public")); // allow loading of static files in "public" directory

// session middleware
app.use(
  session({
    secret: "urlshortener",
    resave: false,
    saveUninitialized: false,
  })
);

// =======================================
//                CONTROLLERS
// =======================================

const userController = require("./controllers/users.js");
app.use("/users", userController);

const urlController = require("./controllers/urls.js");
app.use("/urls", urlController);

const sessionController = require("./controllers/sessions.js");
app.use("/sessions", sessionController);

// =======================================
//              DATABASE (MODELS)
// =======================================

const UrlModel = require("./models/urls.js");
const UserModel = require("./models/users.js");

const userSeed = require("./models/seed-users.js");

// =======================================
//              ROUTES
// =======================================

//======================
// VIEW - ejs
//======================

// app.set("view engine", "ejs");

//======================
// CREATE - Seed data
//======================

app.post("/seeduser", async (req, res) => {
  await userSeed.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });

  UserModel.create(userSeed, (err, seedUser) => {
    if (err) console.log(err.message);
    res.json(seedUser);
  });
});

//======================
// DELETE - Delete all users
//======================

app.post("/delete/:id", async (req, res) => {
  if (req.params.id === "allurl") {
    await UrlModel.deleteMany();
    res.json(`All urls deleted successfuly!`);
    return;
  } else if (req.params.id === "alluser") {
    await UserModel.deleteMany();
    res.json(`All users deleted successfuly!`);
    return;
  }
  await UrlModel.deleteOne({ _id: req.params.id });
  res.json(`Url deleted successfully!`);
});

// =======================================
//              LISTENER
// =======================================

app.listen(process.env.PORT || 5001);
