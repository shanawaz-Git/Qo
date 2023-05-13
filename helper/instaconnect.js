"use Strict";

require("dotenv").config();
const { IgApiClient } = require("instagram-private-api");
const axios = require("axios");
const { quotes } = require("./quotesAPI");
const { randomHashtag } = require("./hashtags");

exports.igImageUpload = async () => {
  var res = {};
  try {
    var quote;
    var quoteRes = quotes();
    await quoteRes.then(function (result) {
      quote = result.quote[0];
    });
    var quoteToInsta = quote.quote + "\n-" + quote.author;
    const text = quoteToInsta;
    var caption =
      "Your views about this Post..?\n.\nThe comment section is yours!!\n.\nI post QUOTES daily\n.\n.\n.\nfollow\n@wisequotient\n@wisequotient\n@wisequotient\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n#wisequotient ";
    var captionWithHashTag = caption + randomHashtag();
    //-----------------------------------------------------------------------
    const imageBuffer = await axios.get(
      `https://web-series-quotes-api.deta.dev/pic/custom?text=${text}&background_color="white"&text_color="black"&text_size=50&x=1080&y=1080`,
      { responseType: "arraybuffer" }
    );
    res = {
      code: 200,
      status: "Success",
      message: "Publishing initialized",
      imageBuffer: imageBuffer.data,
      captionWithHashTag: captionWithHashTag,
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
  console.log("invoked instaclient");
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
          console.log("after publish to IG --> status:" + res.status);
        });
    });
  console.log("after ig publish");
};
