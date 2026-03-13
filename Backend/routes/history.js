const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", async (req, res) => {
  try {
    const [hist] = await db.query("SELECT * FROM history");
    res.json(hist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;

    const [historyRows] = await db.query(
      "SELECT * FROM history WHERE user_id = ? ORDER BY history_id DESC",
      [userId]
    );

    if (!historyRows.length)
      return res.status(404).json({ message: "No history records found" });

    const requestIds = historyRows.map((h) => h.request_id);

    const [requestRows] = await db.query(
      `SELECT * FROM requests WHERE request_id IN (?)`,
      [requestIds]
    );

    const requestMap = {};
    requestRows.forEach((req) => {
      requestMap[req.request_id] = req;
    });

    const combinedData = historyRows.map((h) => ({
      ...h,
      request_details: requestMap[h.request_id] || null, 
    }));

    res.json(combinedData);
  } catch (err) {
    console.error("Error fetching user history:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, request_id, status_code, response_time } = req.body;
    if (!user_id || !request_id || !status_code || !response_time)
      return res.status(400).json({ error: "All fields required" });

    const [user] = await db.query("SELECT * FROM users WHERE user_id=?", [user_id]);
    if (!user.length) return res.status(400).json({ error: "User not found" });

    const [reqCheck] = await db.query("SELECT * FROM requests WHERE request_id=?", [request_id]);
    if (!reqCheck.length) return res.status(400).json({ error: "Request not found" });

    const [result] = await db.query(
      "INSERT INTO history (user_id, request_id, status_code, response_time) VALUES (?,?,?,?)",
      [user_id, request_id, status_code, response_time]
    );
    res.status(201).json({ message: "History record created", history_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { status_code, response_time } = req.body;
    const [rows] = await db.query("SELECT * FROM history WHERE history_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "History record not found" });

    await db.query(
      "UPDATE history SET status_code=?, response_time=? WHERE history_id=?",
      [status_code || rows[0].status_code, response_time || rows[0].response_time, req.params.id]
    );
    res.json({ message: "History record updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM history WHERE history_id=?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "History record not found" });

    await db.query("DELETE FROM history WHERE history_id=?", [req.params.id]);
    res.json({ message: "History deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
