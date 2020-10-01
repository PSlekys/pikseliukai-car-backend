const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

const port = process.env.SERVER_PORT || 3000

app.use(bp.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome to PIX-DRIVE");
});

<<<<<<< HEAD
app.listen(port, () => console.log("Server is working " + port + " port"));
=======
app.listen(port, () =>
  console.log(`Server is working " + process.env.SERVER_PORT + ${port}`)
);
>>>>>>> d6124f82bea1f923870fc288783c39783e7f7044
