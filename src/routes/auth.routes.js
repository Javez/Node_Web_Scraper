const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;
  // Check if email already exists
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store user in the database
    await client.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
      [email, hashedPassword]
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up user", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  // Check if user exists
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Compare passwords
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken });
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});

router.get("/logout", authenticateToken, async (req, res) => {
  // Handle user logout logic
});

module.exports = router;