const express = require("express");

const router = express.Router();

//base Url : api/profile
/**
 * @route  GET /api/profile
 * @desc   Route for Profile
 * @access Private
 */

router.get("/", (req, res) => {
  res.send("Private Profile");
});

module.exports = router;
