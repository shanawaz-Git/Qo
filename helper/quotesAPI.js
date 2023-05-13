"use Strict";
require("dotenv").config();
const axios = require("axios");

var quoteCategory = [
  "age",
  "alone",
  "amazing",
  "anger",
  "architecture",
  "art",
  "attitude",
  "beauty",
  "best",
  "birthday",
  "business",
  "car",
  "change",
  "communications",
  "computers",
  "cool",
  "courage",
  "dad",
  "dating",
  "death",
  "design",
  "dreams",
  "education",
  "environmental",
  "equality",
  "experience",
  "failure",
  "faith",
  "family",
  "famous",
  "fear",
  "fitness",
  "food",
  "forgiveness",
  "freedom",
  "friendship",
  "funny",
  "future",
  "god",
  "good",
  "government",
  "graduation",
  "great",
  "happiness",
  "health",
  "history",
  "home",
  "hope",
  "humor",
  "imagination",
  "inspirational",
  "intelligence",
  "jealousy",
  "knowledge",
  "leadership",
  "learning",
  "legal",
  "life",
  "love",
  "marriage",
  "medical",
  "men",
  "mom",
  "money",
  "morning",
  "movies",
  "success",
  "success",
];

exports.quotes = async () => {
  var resObj = {};
  var n = Math.floor(Math.random() * quoteCategory.length - 1);
  var category = quoteCategory[n];
  await axios
    .get("https://api.api-ninjas.com/v1/quotes?category=" + category, {
      headers: { "X-Api-Key": process.env.QUOTEAPIKEY },
    })
    .then((res) => {
      resObj = {
        quote: res.data,
      };
    });
  return resObj;
};
