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
        "CREATE TABLE ride (id INT AUTO_INCREMENT PRIMARY KEY, destination TEXT, location TEXT, datetime DATETIME, description TEXT, fullname TEXT, phone INT, type TEXT)",
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
  connection.query(
    `SELECT * FROM ride WHERE type = 'driver' `,
    (err, result) => {
      if (err) console.log(err);
      res.json(result);
    }
  );
});

app.get("/driverDetails/:id", (req, res) => {
  if (req.params.id) {
    connection.query(
      `SELECT * FROM ride WHERE id = '${req.params.id}' `,
      (err, result) => {
        if (err) console.log(err);
        res.json(result);
      }
    );
  }
});

app.get("/passenger", (req, res) => {
  connection.query(
    `SELECT * FROM ride WHERE type = 'passenger'`,
    (err, result) => {
      res.json(result);
    }
  );
});

app.get("/passengerDetails/:id", (req, res) => {
  if (req.params.id) {
    connection.query(
      `SELECT * FROM ride WHERE id = '${req.params.id}' `,
      (err, result) => {
        if (err) console.log(err);
        res.json(result);
      }
    );
  }
});

app.post("/passenger", (req, res) => {
  if (req.body.location && req.body.destination) {
    connection.query(
      `INSERT INTO ride (destination, location, datetime, description, fullname, phone, type) VALUES ('${req.body.destination}','${req.body.location}','${req.body.datetime}','${req.body.description}','${req.body.fullname}','${req.body.phone}', '${req.body.type}')`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("error in task");
        } else {
          res.json(result);
        }
      }
    );
  } else {
    res.status(400).send("error adding info");
  }
});

app.post("/driver", (req, res) => {
  if (req.body.location && req.body.destination) {
    connection.query(
      `INSERT INTO ride (destination, location, datetime, description, fullname, phone, type) VALUES ('${req.body.destination}','${req.body.location}','${req.body.datetime}','${req.body.description}','${req.body.fullname}','${req.body.phone}', '${req.body.type}')`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("error in task");
        } else {
          res.json(result);
        }
      }
    );
  } else {
    res.status(400).send("error adding info");
  }
});

app.listen(port, () => console.log("Server is working on " + port + " port"));
