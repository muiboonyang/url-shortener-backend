const mongoose = require("mongoose");
const shortId = require("shortid");

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

console.log(makeid(5));

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
      // default: shortId.generate,
      default: makeid(5),
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
