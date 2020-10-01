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

connection.connect((err) => {
  if (err) throw err;
  connection.query("SHOW TABLES like 'ride'", (err, result) => {
    if (err) console.log(err);
    if (result.length === 0) {
      connection.query(
        "CREATE TABLE ride (id INT AUTO_INCREMENT PRIMARY KEY, destination TEXT, location TEXT, datetime DATETIME, description TEXT, fullname TEXT, phone INT, type BOOLEAN)",
        (err, result) => {
          if (err) throw err;
          console.log("RIDE database created");
        }
      );
    } else {
      console.log("DB RIDE already exists, connected");
    }
  });
});

app.get("/driver", (req, res) => {
  connection.query(`SELECT * FROM ride WHERE type="true"`, (err, result) =>
    res.json(result)
  );
});

app.get("/passenger", (req, res) => {
  connection.query(`SELECT * FROM ride WHERE type="false"`, (err, result) =>
    res.json(result)
  );
});

app.post("/", (req, res) => {
  connection.query(
    `INSERT INTO ride (to, from, datetime, description, name, phone, type) VALUES (${req.body.to}','${req.body.from}','${req.body.datetime}','${req.body.description}','${req.body.name}','${req.body.phone}', '${req.body.type}')`,
    (err, result) => res.json(result)
  );
});

app.listen(port, () => console.log("Server is working on" + port + " port"));
