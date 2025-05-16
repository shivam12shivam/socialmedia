import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");

    if (!user) return res.status(401).json(false);

    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(401).json(false);
  }
};
