"use strict";
const express = require("express");
//----
const { home } = require("../controller/getPoints");
//----
const getRoute = express.Router();
//----
getRoute.get("/", home);
//----
module.exports = { routes: getRoute };
