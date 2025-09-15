const { verifyToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);

  if (!payload) return res.status(401).json({ error: "Invalid token" });

  req.user = payload;
  next();
}

module.exports = authMiddleware;
