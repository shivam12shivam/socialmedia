import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
router.post("/login", login);
router.post("/signup", register);
router.get("/check-auth", verifyToken, async (req, res) => {
  try {
    console.log("inside check auth \n");
    const token = req.cookies.token;
    res.status(200).json({
      user: req.user,
      token: token, // Send the token in the response
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
