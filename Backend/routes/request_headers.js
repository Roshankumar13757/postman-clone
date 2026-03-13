const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", async (req, res) => {
  try {
    const [headers] = await db.query("SELECT * FROM request_headers");
    res.json(headers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM request_headers WHERE header_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Header not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { key, value, request_id } = req.body;
    if (!key || !value || !request_id)
      return res.status(400).json({ error: "key, value, request_id required" });

    const [reqCheck] = await db.query("SELECT * FROM requests WHERE request_id=?", [request_id]);
    if (!reqCheck.length) return res.status(400).json({ error: "Request not found" });

    const [result] = await db.query(
      "INSERT INTO request_headers (request_id, `key`, `value`) VALUES (?,?,?)",
      [request_id, key, value]
    );
    res.status(201).json({ message: "Header created", header_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { key, value } = req.body;
    const [rows] = await db.query("SELECT * FROM request_headers WHERE header_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Header not found" });

    await db.query(
      "UPDATE request_headers SET `key`=?, `value`=? WHERE header_id=?",
      [key || rows[0].key, value || rows[0].value, req.params.id]
    );
    res.json({ message: "Header updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM request_headers WHERE header_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Header not found" });

    await db.query("DELETE FROM request_headers WHERE header_id=?", [req.params.id]);
    res.json({ message: "Header deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
