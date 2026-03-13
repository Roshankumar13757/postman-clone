const request = require("supertest");
const app = require("../server");
const db = require("../db/connection");

let userId;
let workspaceId;
let collectionId;
let requestId;
let historyId;

beforeAll(async () => {
  await db.query("DELETE FROM users WHERE email = ?", ["testuser@example.com"]);

  const [user] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    ["Test User", "testuser@example.com", "password123"]
  );
  userId = user.insertId;

  const [ws] = await db.query(
    "INSERT INTO workspaces (name, description, created_by) VALUES (?, ?, ?)",
    ["History WS", "Workspace for history tests", userId]
  );
  workspaceId = ws.insertId;

  const [col] = await db.query(
    "INSERT INTO collections (workspace_id, collection_name) VALUES (?, ?)",
    [workspaceId, "History Collection"]
  );
  collectionId = col.insertId;

  const [reqRow] = await db.query(
    "INSERT INTO requests (collection_id, name, method, url) VALUES (?, ?, ?, ?)",
    [collectionId, "History Request", "GET", "/test"]
  );
  requestId = reqRow.insertId;
});

afterAll(async () => {
  if (historyId) await db.query("DELETE FROM history WHERE history_id=?", [historyId]);
  if (requestId) await db.query("DELETE FROM requests WHERE request_id=?", [requestId]);
  if (collectionId) await db.query("DELETE FROM collections WHERE collection_id=?", [collectionId]);
  if (workspaceId) await db.query("DELETE FROM workspaces WHERE workspace_id=?", [workspaceId]);
  if (userId) await db.query("DELETE FROM users WHERE user_id=?", [userId]);
  await db.end();
});

describe("History API", () => {
  test("POST /history - create history record", async () => {
    const res = await request(app)
      .post("/history")
      .send({
        user_id: userId,
        request_id: requestId,
        status_code: 200,
        response_time: 123
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("history_id");
    historyId = res.body.history_id;
  });

  test("DELETE /history/:id - delete history", async () => {
    const res = await request(app).delete(`/history/${historyId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("History deleted successfully");
    historyId = null;
  });
});
