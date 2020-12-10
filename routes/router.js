const express = require("express");

const router = express.Router();
const AuthRouter = require("./AuthRouter");
const AuthRouter = require("./ProfileRouter");
const AuthRouter = require("./BookRouter");

// Only /api endpoint

/**
 * @route /api/auth
 * @desc Route for Auth
 */
router.use("/auth", AuthRouter);

/**
 * @route /api/profile
 * @desc Route for Profile
 */
router.use("/auth", ProfileRouter);

/**
 * @route /api/book
 * @desc Route for Book
 */
router.use("/auth", BookRouter);

module.exports = router;
