const request = require("supertest");
const express = require("express");
const variablesRouter = require("../routes/variables");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use("/variables", variablesRouter);

let variableId;

describe("Variables API", () => {
  test("POST /variables - create variable", async () => {
    const res = await request(app)
      .post("/variables")
      .send({ env_id: 1, key_name: "TEST_VAR", value: "abc123" });

    expect(res.statusCode).toBe(201);
    expect(res.body.variable_id).toBeDefined();
    variableId = res.body.variable_id;
  });

  test("GET /variables - get all variables", async () => {
    const res = await request(app).get("/variables");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("PUT /variables/:id - update variable", async () => {
    const res = await request(app)
      .put(`/variables/${variableId}`)
      .send({ value: "xyz456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Variable updated successfully");
  });

  test("DELETE /variables/:id - delete variable", async () => {
    const res = await request(app).delete(`/variables/${variableId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Variable deleted successfully");
  });
});
