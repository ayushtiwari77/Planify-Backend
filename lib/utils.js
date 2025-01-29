import jwt from "jsonwebtoken";

export const tokenSetter = (id, res) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "none", //strict karna hai
    secure: process.env.DEV_ENV === "production" ? true : false,
  });

  return token;
};
