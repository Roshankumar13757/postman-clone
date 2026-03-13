const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const [existing] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const userId = result.insertId;

    const defaultWorkspaceName = "Default Workspace";
    const defaultWorkspaceDescription = "Auto-created workspace for new user";

    const [workspaceResult] = await db.query(
      "INSERT INTO workspaces (name, description, created_by) VALUES (?, ?, ?)",
      [defaultWorkspaceName, defaultWorkspaceDescription, userId]
    );

    const workspaceId = workspaceResult.insertId;

    const defaultCollectionName = "Default Collection";
    const defaultCollectionDescription = "Auto-created collection for your workspace";

    await db.query(
      "INSERT INTO collections (workspace_id, collection_name, collection_description) VALUES (?, ?, ?)",
      [workspaceId, defaultCollectionName, defaultCollectionDescription]
    );

    const [userData] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);

    res.status(201).json({
      success: true,
      message: "Signup successful — default workspace and collection created",
      user: userData[0],
    });

  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
