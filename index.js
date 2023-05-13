const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
//----
const postRoute = require("./routes/postRoute");
const getRoute = require("./routes/getRoute");
//----
//----
const app = express();
const PORT = process.env.PORT || 5009;
//----
app.use(cors());
app.use(bodyParser.json());
//----
app.use("/post", postRoute.routes);
app.use("/", getRoute.routes);
//----
app.listen(PORT, () => {
  console.log(`the server is running in locahost:${PORT}`);
});
