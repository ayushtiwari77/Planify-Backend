import authModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { tokenSetter } from "../lib/utils.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "pls enter complete details" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "password is short" });
    }

    const existingUser = await authModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "you are already registered , pls login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authModel.create({
      name,
      email,
      password: hashedPassword,
    });

    tokenSetter(newUser._id, res);

    const sender = await authModel.findById(newUser._id).select("-password");

    res.status(201).json(sender);
  } catch (error) {
    console.log("error is in register auth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "fill comlete details" });
    }

    const existingUser = await authModel.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "your email or password is incorrect" });
    }

    const matched = await bcrypt.compare(password, existingUser.password);

    if (!matched) {
      return res
        .status(400)
        .json({ message: "your email or password is incorrect" });
    }

    tokenSetter(existingUser._id, res);

    res.status(200).json({
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
      createdAt: existingUser.createdAt,
    });
  } catch (error) {
    console.log("error is in Login auth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });

    res.status(200).json({ message: "user logout successfully" });
  } catch (error) {
    console.log("error is in Logout auth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
