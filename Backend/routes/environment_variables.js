const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post("/variables", async (req, res) => {
  try {
    const { env_id, key_name, value } = req.body;

    if (!env_id || !key_name) {
      return res.status(400).json({ error: "Both env_id and key_name are required." });
    }

    const [env] = await db.query(
      "SELECT environment_id FROM environments WHERE environment_id = ?",
      [env_id]
    );
    if (!env.length) {
      return res.status(404).json({ error: "Environment not found." });
    }

    const [result] = await db.query(
      "INSERT INTO environment_variables (env_id, key_name, value) VALUES (?, ?, ?)",
      [env_id, key_name.trim(), value || null]
    );

    res.status(201).json({
      message: "Environment variable created successfully.",
      variable_id: result.insertId,
    });
  } catch (err) {
    console.error("Error creating environment variable:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM environment_variables");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/get/:env_id", async (req, res) => {
  try {
    const { env_id } = req.params;
    const [vars] = await db.query(
      "SELECT * FROM environment_variables WHERE env_id = ?",
      [env_id]
    );

    if (!vars.length) {
      return res.status(404).json({ message: "No variables found for this environment." });
    }

    res.json({ variables: vars });
  } catch (err) {
    console.error("Error fetching environment variables:", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { key_name, value } = req.body;
    const [rows] = await db.query("SELECT * FROM environment_variables WHERE variable_id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Environment variable not found" });

    await db.query(
      "UPDATE environment_variables SET key_name = ?, value = ? WHERE variable_id = ?",
      [key_name || rows[0].key_name, value || rows[0].value, req.params.id]
    );

    res.json({ message: "Environment variable updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM environment_variables WHERE variable_id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Environment variable not found" });

    await db.query("DELETE FROM environment_variables WHERE variable_id = ?", [req.params.id]);
    res.json({ message: "Environment variable deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
