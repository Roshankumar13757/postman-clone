const express = require("express");
const router = express.Router();
const db = require("../db/connection");

/**
 * @swagger
 * tags:
 *   name: Environments
 *   description: Workspace environments management
 */

/**
 * @swagger
 * /environments:
 *   get:
 *     summary: Get all environments
 *     tags: [Environments]
 *     responses:
 *       200:
 *         description: List of all environments
 */
router.get("/all", async (req, res) => {
  try {
    const [envs] = await db.query("SELECT * FROM environments");
    res.json(envs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /environments/{id}:
 *   get:
 *     summary: Get environment by ID
 *     tags: [Environments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Environment data
 *       404:
 *         description: Environment not found
 */
router.get("/workspace/:workspace_id", async (req, res) => {
  try {
    const { workspace_id } = req.params;
    const [envs] = await db.query(
      "SELECT * FROM environments WHERE workspace_id = ?",
      [workspace_id]
    );

    res.json({ environments: envs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


/**
 * @swagger
 * /environments:
 *   post:
 *     summary: Create a new environment
 *     tags: [Environments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - workspace_id
 *             properties:
 *               name:
 *                 type: string
 *               workspace_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Environment created successfully
 */
router.post("/create", async (req, res) => {
  try {
    const { name, workspace_id } = req.body;
    if (!name || !workspace_id) return res.status(400).json({ error: "name and workspace_id required" });

    const [ws] = await db.query("SELECT * FROM workspaces WHERE workspace_id=?", [workspace_id]);
    if (!ws.length) return res.status(400).json({ error: "Workspace not found" });

    const [result] = await db.query("INSERT INTO environments (workspace_id, name) VALUES (?,?)", [workspace_id, name]);
    res.status(201).json({ message: "Environment created", environment_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /environments/{id}:
 *   put:
 *     summary: Update an environment
 *     tags: [Environments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Environment updated successfully
 */
router.put("/:id", async (req, res) => {
  const envId = req.params.id;
  const { name } = req.body;

  try {
    await db.query("UPDATE environments SET name=? WHERE env_id=?", [name, envId]);
    res.json({ message: "Environment updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /environments/{id}:
 *   delete:
 *     summary: Delete an environment
 *     tags: [Environments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Environment deleted successfully
 */
router.delete("/:id", async (req, res) => {
  const envId = req.params.id;


  try {
    await db.query("DELETE FROM environments WHERE env_id=?", [envId]);
    res.json({ message: "Environment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
