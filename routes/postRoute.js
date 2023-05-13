"use Strict";

const { IGpost } = require("../controller/postPoints");
const express = require("express");

const postRoute = express.Router();

postRoute.post("/igpost", IGpost);

module.exports = { routes: postRoute };
