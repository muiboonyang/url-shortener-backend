const connectDB = require("./models/db");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const ShortUrl = require("./models/shortUrl");

// Config
dotenv.config();
const mongoURI = process.env.MONGO_URI;
// const mongoURI = "mongodb://localhost:27017/urlshortener";
connectDB(mongoURI);

const app = express();

// =======================================
//                MIDDLEWARE
// =======================================

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
//              ROUTES
// =======================================

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });

  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

// =======================================
//              LISTENER
// =======================================

app.listen(process.env.PORT || 5001);

/////////////////////////////////////////////////////////

// // =======================================
// //                CONTROLLERS
// // =======================================

// const userController = require("./controllers/users.js");
// app.use("/users", userController);

// const sessionController = require("./controllers/sessions.js");
// app.use("/sessions", sessionController);

// const taskController = require("./controllers/tasks.js");
// app.use("/tasks", taskController);

// const searchController = require("./controllers/search.js");
// app.use("/search", searchController);

// // =======================================
// //              DATABASE (MODELS)
// // =======================================

// const TaskModel = require("./models/tasks.js");
// const UserModel = require("./models/users.js");

// const taskSeed = require("./models/seed-tasks.js");
// const userSeed = require("./models/seed-users.js");

// // =======================================
// //              ROUTES
// // =======================================

// //======================
// // CREATE - Seed data
// //======================

// app.get("/seedtask", async (req, res) => {
//   const seedTask = await TaskModel.create(taskSeed, (err, data) => {
//     if (err) console.log(err.message);
//     res.json(seedTask);
//   });
// });

// app.get("/seeduser", async (req, res) => {
//   await userSeed.forEach((user) => {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
//   });

//   UserModel.create(userSeed, (err, seedUser) => {
//     if (err) console.log(err.message);
//     res.json(seedUser);
//   });
// });

// //======================
// // CREATE - Import form data (incorporate existing user data)
// //======================

// app.post("/requests/:username", upload.single("image"), async (req, res) => {
//   const userDetails = await UserModel.findOne({
//     username: req.params.username,
//   });

//   if (req.file) {
//     const data = await TaskModel.findOneAndUpdate(
//       {},
//       { image: req.file.path },
//       { sort: { createdAt: -1 } }
//     );
//   } else {
//     await TaskModel.create(
//       {
//         ...req.body,
//         username: userDetails.username,
//         name: userDetails.name,
//         email: userDetails.email,
//         contact: userDetails.contact,
//         address: userDetails.address,
//         unit: userDetails.unit,
//         zipcode: userDetails.zipcode,
//       },
//       (err) => {
//         if (err) {
//           res.status(403).json(`Form failed to submit.`);
//           return;
//         } else {
//           res.json(`Form submitted successfully!`);
//         }
//       }
//     );
//   }
// });

// //======================
// // DELETE - Delete
// //======================

// app.get("/delete/:id", async (req, res) => {
//   if (req.params.id === "alltask") {
//     await TaskModel.deleteMany();
//     res.json(`All tasks deleted successfuly!`);
//     return;
//   } else if (req.params.id === "alluser") {
//     await UserModel.deleteMany();
//     res.json(`All users deleted successfuly!`);
//     return;
//   }
//   await TaskModel.deleteOne({ _id: req.params.id });
//   res.json(`Task deleted successfully!`);
// });

// //======================
// // POST - Add reviews
// //======================

// app.post("/addreview", async (req, res) => {
//   await UserModel.findOneAndUpdate(
//     { username: req.body.acceptedBy },
//     {
//       $push: {
//         reviews: {
//           review: req.body.review,
//           reviewer: req.body.reviewer,
//         },
//       },
//     }
//   );
//   await TaskModel.findByIdAndUpdate(req.body.id, { review: req.body.review });
//   res.json("Updated review!");
// });
