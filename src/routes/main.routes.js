const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", async (req, res) => {
  res.redirect("/sign-in");
});

router.get("/sign-up", async (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "signup.html"));
});

router.get("/sign-in", async (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "signin.html"));
});

module.exports = router;
