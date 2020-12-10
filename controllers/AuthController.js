exports.authRegister = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("Fields", firstName, lastName, email, password);
  //TODO-1: Validate fields
  //TODO-2: check if already registered
  //TODO-3: crypt password
  //TODO-4: save the user to DB

  res.send("Register Completed.");
};

exports.authLogin = (req, res) => {
  // TODO: Auth.
  // TODO: Login func.
  res.send("Login Completed");
};
