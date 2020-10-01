const express = require("express");
const bp = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bp.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello PIXELIUKAI");
});

app.listen(3000, () => console.log("Server is working"));
