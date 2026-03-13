const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post("/", async (req, res) => {
  try {
    const { env_id, key_name, value } = req.body;
    if (!env_id || !key_name) return res.status(400).json({ error: "env_id and key_name required" });

    const [result] = await db.query(
      "INSERT INTO variables (env_id, key_name, value) VALUES (?, ?, ?)",
      [env_id, key_name, value || null]
    );

    res.status(201).json({ variable_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM variables");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { key_name, value } = req.body;
    const [rows] = await db.query("SELECT * FROM variables WHERE variable_id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Variable not found" });

    await db.query(
      "UPDATE variables SET key_name = ?, value = ? WHERE variable_id = ?",
      [key_name || rows[0].key_name, value || rows[0].value, req.params.id]
    );

    res.json({ message: "Variable updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM variables WHERE variable_id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Variable not found" });

    await db.query("DELETE FROM variables WHERE variable_id = ?", [req.params.id]);
    res.json({ message: "Variable deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
