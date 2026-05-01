import User from "../models/User";
import { generateToken } from "../utils/generateToken";

export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax"
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};