const request = require("supertest");
const app = require("../server");
const db = require("../db/connection");

describe("Collections API", () => {
  let collectionId;
  let workspaceId;
  const createdBy = 1; 

  beforeAll(async () => {
    const [result] = await db.query(
      "INSERT INTO workspaces (name, description, created_by) VALUES (?, ?, ?)",
      ["Jest Workspace", "Workspace for testing collections", createdBy]
    );
    workspaceId = result.insertId;
  });

  afterAll(async () => {
    await db.query("DELETE FROM workspaces WHERE workspace_id = ?", [workspaceId]);
    await db.end();
  });

  test("POST /collections - create collection", async () => {
    const res = await request(app)
      .post("/collections")
      .send({
        collection_name: "Test Collection",
        collection_description: "Jest test",
        workspace_id: workspaceId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("collection_id");
    collectionId = res.body.collection_id;
  });

  test("GET /collections - get all collections", async () => {
    const res = await request(app).get("/collections");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /collections/:id - get collection by id", async () => {
    const res = await request(app).get(`/collections/${collectionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.collection_id).toBe(collectionId);
  });

  test("PUT /collections/:id - update collection", async () => {
    const res = await request(app)
      .put(`/collections/${collectionId}`)
      .send({ collection_name: "Updated Collection" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Collection updated successfully");
  });

  test("DELETE /collections/:id - delete collection", async () => {
    const res = await request(app).delete(`/collections/${collectionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Collection deleted");
  });
});
