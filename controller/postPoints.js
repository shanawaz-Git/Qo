"use Strict";

require("dotenv").config();
const { igImageUpload, instaClient } = require("../helper/instaconnect");

exports.IGpost = async (req, res, next) => {
  try {
    var resObj = await igImageUpload();
    res.status(resObj.code).json(resObj.message);
    await instaClient(resObj.imageBuffer, resObj.captionWithHashTag);
  } catch (error) {
    res.status(400).json({
      code: 400,
      status: "Failure",
      message: error.message,
    });
  }
};
