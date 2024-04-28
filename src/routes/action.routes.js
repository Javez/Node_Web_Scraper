const express = require("express");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/parse", authenticateToken, async (req, res) => {
  // Handle data parsing logic
});

module.exports = router;