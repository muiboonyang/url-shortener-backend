const mongoose = require("mongoose");
const shortId = require("shortid");

const UrlSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    full: {
      type: String,
      required: true,
    },

    short: {
      type: String,
      required: true,
    },

    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true, collection: "shorturls" }
);

const UrlModel = mongoose.model("UrlModel", UrlSchema);

module.exports = UrlModel;
