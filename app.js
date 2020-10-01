const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bp.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello PIXELIUKAI");
});

app.listen(process.env.SERVER_PORT, () =>
  console.log("Server is working " + process.env.SERVER_PORT + " port")
);
