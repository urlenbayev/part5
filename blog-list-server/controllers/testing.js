const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

/**
|--------------------------------------------------
POST http://localhost:3001/api/reset
Drops the user and blog tables
|--------------------------------------------------
*/
router.post("/reset", async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = router;
