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
// READ - Redirect to full link when clicking on short link
//======================

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await UrlModel.findOne({ short: req.params.shortUrl });
  if (shortUrl === null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

//======================
// UPDATE
//======================

app.post("/:shortUrl/update", async (req, res) => {
  const longUrl = req.body.url;

  await UserModel.findOneAndUpdate(
    { short: req.params.shortUrl },
    { full: longUrl }
  );

  res.json(`Profile updated successfully!`);
});

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
  await UrlModel.deleteOne({ short: req.params.id });
  res.json(`Url deleted successfully!`);
});

// =======================================
//              LISTENER
// =======================================

const server = app.listen(process.env.PORT || 5001);

module.exports = server;
