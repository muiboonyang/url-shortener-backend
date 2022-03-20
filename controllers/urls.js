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
// READ - Get links of specific user
//=======================

router.get("/:username", async (req, res) => {
  const userUrl = await UrlModel.findOne({ username: req.params.username });
  res.json(userUrl);
});

//======================
// READ - Get specific link
//=======================

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
  await UrlModel.create({
    username: req.body.username,
    full: req.body.url,
  });
  //   res.redirect("/");
});

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
