const request = require("supertest");
const app = require("../server");
const db = require("../db/connection");

let userId;

beforeAll(async () => {
  await db.query("DELETE FROM users WHERE email = ?", ["testuser@example.com"]);

  const [user] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    ["Test User", "testuser@example.com", "testpassword123"]
  );
  userId = user.insertId;
});

afterAll(async () => {
  if (userId) await db.query("DELETE FROM users WHERE user_id=?", [userId]);
  await db.end();
});

describe("Users API", () => {
  test("PUT /users/:id - update user", async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ name: "Updated User" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User updated successfully");
  });

  test("DELETE /users/:id - delete user", async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
    userId = null;
  });
});
