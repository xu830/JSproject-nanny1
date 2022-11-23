const { sign, verify } = require("jsonwebtoken");
const createTokens = (user) => {
  let adminValue = user.admin;
  if (!user.admin) {
    adminValue = false;
  }
  const accessToken = sign(
    { email: user.email, id: user.id, admin: adminValue },
    "secretKey",
    {
      expiresIn: "1hr",
    }
  );
  return accessToken;
};
const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    req.id = undefined;
    req.admin = false;
    return next();
  }
  try {
    const validToken = verify(accessToken, "secretKey");
    if (validToken) {
      req.authenticated = true; //can save variable
      req.id = validToken.id;
      req.admin = validToken.admin;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
module.exports = { createTokens, validateToken };
