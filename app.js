const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bp.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  sslmode: process.env.DB_SSLMODE,
});

app.get("/", (req, res) => {
  res.json("Welcome to PIX-DRIVE");
});

app.listen(port, () => console.log("Server is working on" + port + " port"));
