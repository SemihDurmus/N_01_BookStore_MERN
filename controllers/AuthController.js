const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //console.log("Fields", firstName, lastName, email, password);

  //TODO-1:+ Validate fields
  const validationError = validationResult(req);
  //console.log("VAL ERROR  : ", validationError);
  if (validationError?.errors?.length > 0) {
    return res.status(400).json({ errors: validationError.array() });
  }

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

//-----------------LOGIN--------------------------------------------------//

exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

  // TODO-1: Field Validation
  const validationErr = validationResult(req);
  if (validationErr?.errors?.length > 0) {
    return res.status(400).json({ errors: validationErr.array() });
  }

  // TODO-2: user exists?
  const userData = await User.findOne({ email });
  if (!userData) {
    return res
      .status(400)
      .json({ errors: [{ message: "User doesn't exists!!" }] });
  }
  // TODO-3: Password comparison
  const isPasswordMatch = await bcrypt.compare(password, userData.password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ errors: [{ message: "Invalid credentials" }] });
  }

  // TODO-4: Authentication: return json web token JWT
  jwt.sign(
    { userData },
    process.env.JWT_SECRET_KEY,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) {
        return res.status(400).json({ errors: [{ message: "Unknown Error" }] });
      }
      res.send(token);
    }
  );
};
