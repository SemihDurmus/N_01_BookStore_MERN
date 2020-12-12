const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

//base Url : api/profile
/**
 * @route  GET /api/profile
 * @desc   Route for Profile
 * @access Private
 */

router.get("/", auth, (req, res) => {
  res.send(req.decodedUser.email);
});

module.exports = router;
