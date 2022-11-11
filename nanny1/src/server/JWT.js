const { sign, verify } = require("jsonwebtoken");
const createTokens = (user) => {
  const accessToken = sign({ email: user.email, id: user.id }, "secretKey", {
    expiresIn: "1hr",
  });
  return accessToken;
};
const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).json({ error: "user not authenticated!" });
  }
  try {
    const validToken = verify(accessToken, "secretKey");
    if (validToken) {
      req.authenticated = true; //can save variable
      req.id = validToken.id;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
module.exports = { createTokens, validateToken };
