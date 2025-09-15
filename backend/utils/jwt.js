const jwt = require('jsonwebtoken');
const SECRET = "i9fC5btj8gydjdOPW45U3sZtSQnkSxuG"; 

function generateToken(user) {
  return jwt.sign({ email: user.email, role: user.role, tenantSlug: user.tenantSlug }, SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
