import jwt from "jsonwebtoken";
import authModel from "../models/auth.model.js";

export const authenticator = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "you are not logged in " });
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodeData) {
      return res.status(401).json({ message: "you are not logged in " });
    }

    const user = await authModel.findById(decodeData.id).select("-password");

    req.user = user;

    next();
  } catch (error) {
    console.log("error is in authenticator middleware:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
