import jwt from "jsonwebtoken";

const generateToken = function (userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  return token;
};

export default generateToken;
