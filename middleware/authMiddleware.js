const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //TODO-1:+ get Token
  const token = req.header("token");
  //TODO-2:+ return error if there is no token
  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }
  //TODO-3: verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid token" });
    } else {
      req.decodedUser = decodedToken.userData;
      next();
    }
  });
};

module.exports = authMiddleware;
