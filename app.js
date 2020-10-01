const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.SERVER_PORT || 3000;

app.use(bp.json());
app.use(cors());

app.get("/driver", (req, res) => {
  connection.query(`SELECT * FROM ride WHERE type="driver"`, (err, result) =>
    res.json(result)
  );
});

app.get("/passenger", (req, res) => {
  connection.query(`SELECT * FROM ride WHERE type="passenger"`, (err, result) =>
    res.json(result)
  );
});

app.post("/", (req, res) => {
  connection.query(
    `INSERT INTO ride (to, from, datetime, description, name, phone, type) VALUES (${req.body.to}','${req.body.from}','${req.body.datetime}','${req.body.description}','${req.body.name}','${req.body.phone}', '${req.body.type}')`,
    (err, result) => res.json(result)
  );
});

app.listen(port, () => console.log(`Server is working at ${port}`));
