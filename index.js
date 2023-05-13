const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
//----
const postRoute = require("./routes/postRoute");
//----
//----
const app = express();
const PORT = process.env.PORT;
//----
app.use(cors());
app.use(bodyParser.json());
//----
app.use("/post", postRoute.routes);
//----
app.listen(PORT, () => {
  console.log(`the server is running in locahost:${PORT}`);
});
