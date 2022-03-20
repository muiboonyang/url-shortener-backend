//======================
// DEPENDENCIES
//======================

const express = require("express");
const router = express.Router();
const UrlModel = require("../models/urls.js");

//======================
// ROUTES
//======================

//======================
// READ - Get (all links)
//=======================

// router.get("/", async (req, res) => {
//   const allUsers = await UserModel.find({});
//   res.json(allUsers);
// });

router.get("/", async (req, res) => {
  const shortUrls = await UrlModel.find({});
  res.json(shortUrls);
  //   const shortUrls = await UrlModel.find();
  //   res.render("index", { shortUrls: shortUrls });
});

//======================
// READ - Get specific link
//=======================

// router.get("/:username", async (req, res) => {
//   const foundUser = await UserModel.findOne({ username: req.params.username });
//   res.json(foundUser);
// });

router.get("/:shortUrl", async (req, res) => {
  const shortUrl = await UrlModel.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

//======================
// CREATE - Post (new link using form input)
//=======================

router.post("/shortUrls", async (req, res) => {
  await UrlModel.create({ full: req.body.fullUrl });
  res.redirect("/myurls");
});

// router.post("/new", async (req, res) => {
//   const formInput = req.body;
//   const username = req.body.username;
//   const password = req.body.password;

//   const existingUsername = await UserModel.find({ username: username });
//   //   console.log(existingUsername);

//   if (existingUsername.length !== 0) {
//     res
//       .status(403)
//       .json(
//         `Username "${req.body.username}" already exists! Choose another username.`
//       );
//     return;
//   } else {
//     const hashPassword = await bcrypt.hash(password, 12);
//     await UserModel.create({ ...formInput, password: hashPassword });
//     res.json(
//       `New user created! username: ${username} | password: ${password} | hash: ${hashPassword}`
//     );
//   }
// });

//======================
// UPDATE
//======================

// router.post("/:username/update", async (req, res) => {
//   const formInput = req.body;
//   const password = req.body.password;
//   const hashPassword = await bcrypt.hash(password, 12);

//   await UserModel.findOneAndUpdate(
//     { username: req.params.username },
//     { ...formInput, password: hashPassword }
//   );
//   res.json(`Profile updated successfully!`);
// });

//======================
// EXPORT
//======================

module.exports = router;
