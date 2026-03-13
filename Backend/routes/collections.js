const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", async (req, res) => {
  try {
    const [collections] = await db.query("SELECT * FROM collections");
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM collections WHERE collection_id=?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ message: "Collection not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/workspace/:workspaceId", async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;

    if (!workspaceId) return res.status(400).json({ error: "workspaceId required" });

    const [ws] = await db.query("SELECT * FROM workspaces WHERE workspace_id = ?", [workspaceId]);
    if (!ws.length) return res.status(404).json({ error: "Workspace not found" });

    const [collections] = await db.query(
      "SELECT collection_id, collection_name, collection_description, created_at FROM collections WHERE workspace_id = ? ORDER BY collection_id DESC",
      [workspaceId]
    );

    res.status(200).json({
      message: "Collections fetched successfully",
      count: collections.length,
      collections,
    });
  } catch (err) {
    console.error("Error fetching collections:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { workspace_id, collection_name, collection_description } = req.body;

    if (!workspace_id) return res.status(400).json({ error: "Workspace ID required" });
    if (!collection_name) return res.status(400).json({ error: "Collection name required" });

    const [result] = await db.query(
      "INSERT INTO collections (workspace_id, collection_name, collection_description, created_at) VALUES (?, ?, ?, NOW())",
      [workspace_id, collection_name, collection_description]
    );

    res.status(201).json({
      message: "Collection created successfully",
      collection: {
        collection_id: result.insertId,
        workspace_id,
        collection_name,
        collection_description,
        created_at: new Date(),
      },
    });
  } catch (err) {
    console.error("Error creating collection:", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM collections WHERE collection_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Collection not found" });

    await db.query("DELETE FROM collections WHERE collection_id=?", [req.params.id]);
    res.json({ message: "Collection deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
