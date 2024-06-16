const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json()); // Middleware untuk parsing JSON

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL server.");
});

const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
