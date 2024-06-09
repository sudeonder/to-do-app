import User from "../models/user.js";
import { createSecretToken } from "../utils/secretToken.js";
import bcrypt from "bcryptjs";

const signUp = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }
    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user: user,
      token: token,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ $or: [{ email }, { username: email }] });
    if (!user) {
      return res.json({
        message: "Incorrect password or email",
        success: false,
      });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({
        message: "Incorrect password or email",
        success: false,
      });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user: user,
      token: token,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

export { signUp, signIn };
