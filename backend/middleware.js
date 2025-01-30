const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userID = decoded.userID;
    next(); // Proceed to the next middleware or route
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
};

module.exports = { authMiddleware };
