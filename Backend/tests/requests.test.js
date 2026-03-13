const request = require("supertest");
const app = require("../server");
const db = require("../db/connection");

let workspaceId;
let collectionId;
let requestId;

beforeAll(async () => {
  const [ws] = await db.query(
    "INSERT INTO workspaces (name, description, created_by) VALUES (?, ?, ?)",
    ["Test Workspace", "Workspace for requests testing", 1]
  );
  workspaceId = ws.insertId;

  const [col] = await db.query(
    "INSERT INTO collections (workspace_id, collection_name, collection_description) VALUES (?, ?, ?)",
    [workspaceId, "Test Collection", "Collection for requests"]
  );
  collectionId = col.insertId;
});

afterAll(async () => {
  if (requestId) await db.query("DELETE FROM requests WHERE request_id=?", [requestId]);
  if (collectionId) await db.query("DELETE FROM collections WHERE collection_id=?", [collectionId]);
  if (workspaceId) await db.query("DELETE FROM workspaces WHERE workspace_id=?", [workspaceId]);
  await db.end();
});

describe("Requests API", () => {
  test("POST /requests - create request", async () => {
    const res = await request(app)
      .post("/requests")
      .send({
        collection_id: collectionId,
        name: "Test Request",
        method: "GET",
        url: "/test"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("request_id");
    requestId = res.body.request_id;
  });

  test("PUT /requests/:id - update request", async () => {
    const res = await request(app)
      .put(`/requests/${requestId}`)
      .send({ name: "Updated Request", method: "POST", url: "/updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Request updated");
  });

  test("DELETE /requests/:id - delete request", async () => {
    const res = await request(app).delete(`/requests/${requestId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Request deleted");
    requestId = null;
  });
});
