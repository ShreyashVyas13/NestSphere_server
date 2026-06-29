const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const flatRoutes = require("./routes/flatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/members", memberRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NestSphere Backend Running 🚀",
  });
});

module.exports = app;