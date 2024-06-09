import User from "../models/user.js";
import jwt from "jsonwebtoken";

const userVerification = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized (missing token)" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized (invalid token)" });
    }
    // Attach user data *after* asynchronous operations are complete
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { userVerification };
