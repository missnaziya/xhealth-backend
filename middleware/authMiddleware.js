const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

  
  
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    // req.user = decoded; // Attach user data to request
    req.id = decoded.id; // Attach user data to request
    req.role = decoded.role; // Attach user data to request
    
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
