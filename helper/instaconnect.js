"use Strict";

require("dotenv").config();
const { IgApiClient } = require("instagram-private-api");
const quoteBuffer = require("../schemas/quoteBufferSchema");

exports.igImageUpload = async () => {
  var res = {};
  var dbRes = {};
  try {
    await quoteBuffer
      .findOne(
        {},
        { _id: false, createdAt: false, updatedAt: false, __v: false }
      )
      .then((data) => {
        if (data.length == 0) {
          dbRes = {
            code: 201,
            status: "Failure",
            message: `No carriers available`,
          };
        } else {
          dbRes = {
            code: 200,
            status: "Success",
            caption: data.caption,
            imgBuffer: data.quoteBuffer,
            data: data,
          };
        }
      });
    if (dbRes.code == 200) {
      const ig = new IgApiClient();
      ig.state.generateDevice(process.env.UNAME);
      await ig.account
        .login(process.env.UNAME, process.env.PASSWORD)
        .then(async () => {
          await ig.publish
            .photo({
              file: dbRes.imgBuffer,
              caption: dbRes.caption,
            })
            .then((res) => {
              res = {
                code: 200,
                status: "Success",
                message: "Publishing initialized",
              };
            })
            .catch((err) => {
              res = {
                code: 202,
                status: "Failure",
                message: err,
              };
            });
        });
      // res = await this.instaClient(dbRes.imgBuffer, dbRes.caption);
    }
    res = {
      code: 200,
      status: "Success",
      message: "Publishing initialized",
    };
  } catch (error) {
    res = {
      code: 403,
      status: "Failure",
      message: `Something went wrong!\nerror: ${error}`,
    };
  }
  return res;
};

exports.instaClient = async (imageBuffer, captionWithHashTag) => {
  res = {};
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.UNAME);
  await ig.account
    .login(process.env.UNAME, process.env.PASSWORD)
    .then(async () => {
      await ig.publish
        .photo({
          file: imageBuffer,
          caption: captionWithHashTag,
        })
        .then((res) => {
          res = {
            code: 200,
            status: "Success",
            message: "Publishing initialized",
          };
        })
        .catch((err) => {
          res = {
            code: 202,
            status: "Failure",
            message: err,
          };
        });
    });
  return res;
};
