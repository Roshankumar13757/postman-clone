const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/all", async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE user_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE user_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    await db.query(
      "UPDATE users SET name=?, email=?, password=? WHERE user_id=?",
      [name || rows[0].name, email || rows[0].email, password || rows[0].password, req.params.id]
    );
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE user_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    await db.query("DELETE FROM users WHERE user_id=?", [req.params.id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
