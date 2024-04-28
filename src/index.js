const express = require("express");
const router = require("./routes/main.routes");
const app = express();

const env = process.env.NODE_ENV || "development";

const PORT = process.env[`${env.toUpperCase()}_APP_PORT`] || "";

app.use(router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
