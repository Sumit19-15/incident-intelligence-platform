import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async function (req, res, next) {
  try {
    let token = req.cookies.token || req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
        status: "failed",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User no longer exists.", status: "failed" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", status: "failed" });
  }
};

export default authMiddleware;
