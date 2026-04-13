const express = require("express");
const cors = require("cors");

const analyzeRoute = require("./routes/analyze");
const behaviorRoute = require("./routes/behavior");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/analyze", analyzeRoute);
app.use("/behavior", behaviorRoute);

// Test routes
app.get("/home", (req, res) => {
  res.json({ message: "Welcome to InfraScan API" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});