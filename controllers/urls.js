//======================
// DEPENDENCIES
//======================

const express = require("express");
const router = express.Router();
const UrlModel = require("../models/urls.js");

// const makeid = require("../models/util");
// const randomID = makeid(10);

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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
    short: makeid(10),
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
