const request = require("supertest");
const app = require("../server");
const db = require("../db/connection");

describe("Workspaces API", () => {
  let workspaceId;
  let userId = 1; 

  afterAll(async () => {
    await db.end();
  });

  test("POST /workspaces - create workspace", async () => {
    const res = await request(app)
      .post("/workspaces")
      .send({
        name: "Test Workspace",
        description: "Workspace for Jest",
        created_by: userId
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("workspace_id");
    workspaceId = res.body.workspace_id;
  });

  test("GET /workspaces - get all workspaces", async () => {
    const res = await request(app).get("/workspaces");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /workspaces/:id - get workspace by id", async () => {
    const res = await request(app).get(`/workspaces/${workspaceId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.workspace_id).toBe(workspaceId);
  });

  test("PUT /workspaces/:id - update workspace", async () => {
    const res = await request(app)
      .put(`/workspaces/${workspaceId}`)
      .send({ name: "Updated Workspace" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Workspace updated successfully");
  });

  test("DELETE /workspaces/:id - delete workspace", async () => {
    const res = await request(app).delete(`/workspaces/${workspaceId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Workspace deleted successfully");
  });
});
