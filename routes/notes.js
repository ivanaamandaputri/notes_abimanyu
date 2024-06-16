const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Membuat note baru
router.post("/", (req, res) => {
  const { title, datetime, note } = req.body;
  const sql = "INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)";
  db.query(sql, [title, datetime, note], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Note created", id: result.insertId });
  });
});

// Menampilkan semua notes
router.get("/", (req, res) => {
  const sql = "SELECT * FROM notes";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Menampilkan salah satu note
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM notes WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(results[0]);
  });
});

// Mengubah note
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;
  const sql = "UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?";
  db.query(sql, [title, datetime, note, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Note updated" });
  });
});

// Menghapus note
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM notes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Note deleted" });
  });
});

module.exports = router;
