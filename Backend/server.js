const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const db = require("./db/connection");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const workspaceRoutes = require("./routes/workspaces");
const collectionRoutes = require("./routes/collections");
const requestRoutes = require("./routes/requests");
const headerRoutes = require("./routes/request_headers");
const environmentRoutes = require("./routes/environments");
const variableRoutes = require("./routes/environment_variables");
const historyRoutes = require("./routes/history");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Postman Clone API",
      version: "1.0.0",
      description: "API documentation for Postman Clone backend",
    },
    servers: [{ url: "http://localhost:5000", }],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/request_headers", headerRoutes);
app.use("/api/environments", environmentRoutes);
app.use("/api/environment/variables", variableRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Postman Clone API is running! Visit /api-docs for Swagger UI");
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

module.exports = app;
