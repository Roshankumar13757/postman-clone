const request = require("supertest");
const app = require("../server");
const db = require("../db/connection");

let workspaceId;
let environmentId;

beforeAll(async () => {
  const [ws] = await db.query(
    "INSERT INTO workspaces (name, description, created_by) VALUES (?, ?, ?)",
    ["Env Workspace", "Workspace for environment tests", 1]
  );
  workspaceId = ws.insertId;

  const [env] = await db.query(
    "INSERT INTO environments (workspace_id, name) VALUES (?, ?)",
    [workspaceId, "Test Environment"]
  );
  environmentId = env.insertId;
});

afterAll(async () => {
  if (environmentId) await db.query("DELETE FROM environments WHERE env_id=?", [environmentId]);
  if (workspaceId) await db.query("DELETE FROM workspaces WHERE workspace_id=?", [workspaceId]);
  await db.end();
});

describe("Environments API", () => {
  test("PUT /environments/:id - update environment", async () => {
    const res = await request(app)
      .put(`/environments/${environmentId}`)
      .send({ name: "Updated Environment" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Environment updated successfully");
  });

  test("DELETE /environments/:id - delete environment", async () => {
    const res = await request(app).delete(`/environments/${environmentId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Environment deleted successfully");
    environmentId = null;
  });
});
