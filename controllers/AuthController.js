const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const validator = require("express-validator");

exports.authRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("Fields", firstName, lastName, email, password);

  //TODO-1: Validate fields

  //TODO-2:+ check if user is already registered
  const userData = await User.findOne({ email }); //Bring this record with the email we send

  if (userData) {
    return res
      .status(400)
      .json({ errors: [{ message: "User already exists" }] });
  }

  //TODO-3:+ crypt password
  const salt = await bcrypt.genSalt(10); // or w/o await bcrypt.genSaltSync(10)
  const newPassword = await bcrypt.hash(password, salt);
  //console.log("salt : ", salt, " Crypted password : ", newPassword);
  const user = new User({
    firstName,
    lastName,
    email,
    password: newPassword, //crypted password
  });

  //TODO-4:+ save the user to DB
  await user.save();
  //TODO: error handling for saving
  res.send("Register Completed.");
};

exports.authLogin = (req, res) => {
  // TODO: Auth.
  // TODO: Login func.
  res.send("Login Completed");
};
