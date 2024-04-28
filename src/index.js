const express = require("express");
const mainRoutes = require("./routes/main.routes");
const authRoutes = require("./routes/auth.routes");
const actionRoutes = require("./routes/action.routes");
const dotenv = require("dotenv");

dotenv.config();

const env = process.env.NODE_ENV || "development";
const app = express();

app.use("/", mainRoutes)
app.use("/auth", authRoutes);
app.use("/actions", actionRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env[`${env.toUpperCase()}_APP_PORT`] || "";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
