const jwt = require("jsonwebtoken");

// 🔐 VERIFY TOKEN (LOGIN CHECK)
exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check token existence
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Clean user object
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);

    return res.status(403).json({
      message: "Invalid or expired token."
    });
  }
};

// 👑 ADMIN CHECK
exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized. Please login first."
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admins only."
    });
  }

  next();
};