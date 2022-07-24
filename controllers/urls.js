//======================
// DEPENDENCIES
//======================

const express = require("express");
const router = express.Router();
const UrlModel = require("../models/urls.js");

const generateId = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

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
  const shortId = generateId(10);
  const existingShortId = await UrlModel.find({ short: shortId });

  if (existingShortId.length !== 0) {
    // Short URL exists
    res.status(403).json(`Please try again!`);
    return;
  } else {
    await UrlModel.create({
      username: req.body.username,
      full: req.body.url,
      short: shortId,
    });
    res.status(200).json({
      message: `"${req.body.username}" has shortened a new url: ${req.body.url}.`,
    });
  }
});

//======================
// EXPORT
//======================

module.exports = router;
