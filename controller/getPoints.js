"use strict";

exports.home = (req, res, next) => {
  try {
    res.status(200).send("welcome");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
