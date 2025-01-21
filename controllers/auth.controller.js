import authModel from "../models/auth.model.js";
import bcrypt from "bcrypt";

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
    console.log(newUser);

    res.status(201).json({ message: "you are successfully registered" });
  } catch (error) {
    console.log("error is in register auth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {};

export const logout = async (req, res) => {};
