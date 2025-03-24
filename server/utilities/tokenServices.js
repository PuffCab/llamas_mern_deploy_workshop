import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const payload = { sub: userId, randomField: "any information" };

  const options = {
    expiresIn: "1d",
  };

  const secretOrPrivateKey = "some very complicated password";

  const jwtToken = jwt.sign(payload, secretOrPrivateKey, options);
  if (!jwtToken) return null;

  if (jwtToken) return jwtToken;
};

export { generateToken };
