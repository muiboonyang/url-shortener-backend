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

router.get("/", async (req, res) => {
  const shortUrls = await UrlModel.find({});
  res.json(shortUrls);
});

//======================
// READ - Get links of specific user
//=======================

router.get("/:username", async (req, res) => {
  const userUrl = await UrlModel.find({ username: req.params.username });
  res.json(userUrl);
});

//======================
// CREATE - Post (new link using form input)
//=======================

router.post("/shortUrls", async (req, res) => {
  await UrlModel.create({
    username: req.body.username,
    full: req.body.url,
  });
  res.status(200).json({
    status: "ok",
    message: `"${req.body.username}" has shortened a new url: ${req.body.url}.`,
  });
});

//======================
// EXPORT
//======================

module.exports = router;
