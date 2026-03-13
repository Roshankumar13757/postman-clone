const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/all", async (req, res) => {
  try {
    const [workspaces] = await db.query("SELECT * FROM workspaces");
    res.json(workspaces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/workspace/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM workspaces WHERE workspace_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Workspace not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);
    if (!user.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const [workspaces] = await db.query(
      `SELECT w.workspace_id, w.name, w.description, w.created_by, u.name AS created_by_name, u.email AS created_by_email, w.created_at
       FROM workspaces w
       JOIN users u ON w.created_by = u.user_id
       WHERE w.created_by = ?
       ORDER BY w.workspace_id DESC`,
      [userId]
    );

    if (!workspaces.length) {
      return res.status(200).json({ message: "No workspaces found for this user", workspaces: [] });
    }

    res.status(200).json({
      message: "Workspaces fetched successfully",
      count: workspaces.length,
      workspaces,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/create", async (req, res) => {
  try {
    const { name, description, created_by } = req.body;
    if (!name || !created_by)
      return res.status(400).json({ error: "name and created_by required" });

    const [user] = await db.query("SELECT * FROM users WHERE user_id=?", [created_by]);
    if (!user.length) return res.status(400).json({ error: "User not found" });

    const [result] = await db.query(
      "INSERT INTO workspaces (name, description, created_by) VALUES (?,?,?)",
      [name, description || null, created_by]
    );
    res.status(201).json({ message: "Workspace created", workspace_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const [rows] = await db.query("SELECT * FROM workspaces WHERE workspace_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Workspace not found" });

    await db.query(
      "UPDATE workspaces SET name=?, description=? WHERE workspace_id=?",
      [name || rows[0].name, description || rows[0].description, req.params.id]
    );
    res.json({ message: "Workspace updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM workspaces WHERE workspace_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Workspace not found" });

    await db.query("DELETE FROM workspaces WHERE workspace_id=?", [req.params.id]);
    res.json({ message: "Workspace deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
