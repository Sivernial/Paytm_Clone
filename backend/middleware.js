const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const authVerify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userID) {
      req.userID = decoded.userID;
      next();
    }
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  module.exports = authVerify;
};
