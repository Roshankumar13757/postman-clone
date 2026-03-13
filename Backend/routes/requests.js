const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/:collection_id", async (req, res) => {
  try {
    const { collection_id } = req.params;
    if (!collection_id) {
      return res.status(400).json({ error: "collection_id is required" });
    }

    const [rows] = await db.query(
      "SELECT * FROM requests WHERE collection_id = ?",
      [collection_id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "No requests found for this collection" });
    }

    res.status(200).json({ requests: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name, collection_id, method, url } = req.body;
    if (!name || !collection_id || !method || !url)
      return res.status(400).json({ error: "name, collection_id, method, url required" });

    const [coll] = await db.query("SELECT * FROM collections WHERE collection_id=?", [collection_id]);
    if (!coll.length) return res.status(400).json({ error: "Collection not found" });

    const [result] = await db.query(
      "INSERT INTO requests (collection_id, name, method, url) VALUES (?,?,?,?)",
      [collection_id, name, method, url]
    );
    res.status(201).json({ message: "Request created", request_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, method, url } = req.body;
    const [rows] = await db.query("SELECT * FROM requests WHERE request_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Request not found" });

    await db.query(
      "UPDATE requests SET name=?, method=?, url=? WHERE request_id=?",
      [name || rows[0].name, method || rows[0].method, url || rows[0].url, req.params.id]
    );
    res.json({ message: "Request updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM requests WHERE request_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Request not found" });

    await db.query("DELETE FROM requests WHERE request_id=?", [req.params.id]);
    res.json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/save", async (req, res) => {
  try {
    const { user_id, collection_id, name, method, url, status_code, response_time } = req.body;

    // 🔹 Validate required fields
    if (!user_id || !collection_id || !name || !method || !url || !status_code || !response_time) {
      return res.status(400).json({ error: "All fields (user_id, collection_id, name, method, url, status_code, response_time) are required" });
    }

    // 🔹 Check if user exists
    const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
    if (!user.length) return res.status(400).json({ error: "User not found" });

    // 🔹 Check if collection exists
    const [coll] = await db.query("SELECT * FROM collections WHERE collection_id = ?", [collection_id]);
    if (!coll.length) return res.status(400).json({ error: "Collection not found" });

    // 🔹 Check if a request already exists in the same collection with same method + url
    const [existingRequest] = await db.query(
      "SELECT * FROM requests WHERE collection_id = ? AND method = ? AND url = ?",
      [collection_id, method, url]
    );

    let request_id;

    if (existingRequest.length) {
      // ✅ Update existing request name (if needed)
      request_id = existingRequest[0].request_id;
      await db.query(
        "UPDATE requests SET name = ?, method = ?, url = ? WHERE request_id = ?",
        [name, method, url, request_id]
      );

      // ✅ Update history for this request
      await db.query(
        "UPDATE history SET status_code = ?, response_time = ?, created_at = NOW() WHERE user_id = ? AND request_id = ?",
        [status_code, response_time, user_id, request_id]
      );

      return res.status(200).json({
        message: "Request and history updated successfully",
        request_id,
      });
    } else {
      // ✅ Create new request
      const [reqInsert] = await db.query(
        "INSERT INTO requests (collection_id, name, method, url) VALUES (?,?,?,?)",
        [collection_id, name, method, url]
      );
      request_id = reqInsert.insertId;

      // ✅ Create new history record
      const [histInsert] = await db.query(
        "INSERT INTO history (user_id, request_id, status_code, response_time) VALUES (?,?,?,?)",
        [user_id, request_id, status_code, response_time]
      );

      return res.status(201).json({
        message: "New request and history created successfully",
        request_id,
        history_id: histInsert.insertId,
      });
    }
  } catch (err) {
    console.error("Error in /save API:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
