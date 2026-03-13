const request = require("supertest");
const express = require("express");
const envRouter = require("../routes/environment_variables");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use("/environment_variables", envRouter);

let variableId;

describe("Environment Variables API", () => {
  test("POST /environment_variables - create variable", async () => {
    const res = await request(app)
      .post("/environment_variables")
      .send({ env_id: 1, key_name: "TOKEN", value: "abc123" });

    expect(res.statusCode).toBe(201);
    expect(res.body.variable_id).toBeDefined();
    variableId = res.body.variable_id;
  });

  test("GET /environment_variables - get all variables", async () => {
    const res = await request(app).get("/environment_variables");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("PUT /environment_variables/:id - update variable", async () => {
    const res = await request(app)
      .put(`/environment_variables/${variableId}`)
      .send({ value: "xyz456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Environment variable updated successfully");
  });

  test("DELETE /environment_variables/:id - delete variable", async () => {
    const res = await request(app).delete(`/environment_variables/${variableId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Environment variable deleted successfully");
  });
});
