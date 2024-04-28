const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./middleware/auth");

const router = express.Router();

router.post("/auth/sign-up", async (req, res) => {
  // Handle user sign-up logic
});

router.post("/auth/login", async (req, res) => {
  // Handle user login logic
});

router.get("/auth/logout", authenticateToken, async (req, res) => {
  // Handle user logout logic
});

module.exports = router;
