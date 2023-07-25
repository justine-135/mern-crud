const jwt = require("jsonwebtoken");
const User = require("../models/users");

const requireAuth = async (req, res, next) => {
  try {
    // Read token off cookies
    const token = req.cookies.Authorization;
    const email = req.cookies.email;

    // Decode the token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // const decodedEmail = jwt.verify(email, process.env.SECRET);

    // Check expiration
    if (Date.now() > decodedToken.exp) return res.sendStatus(401);

    // Find user using decodedToken sub
    const user = await User.findById(decodedToken.sub);
    if (!user) return res.sendStatus(401);

    // attach user to req
    req.user = user;

    // continue on
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = requireAuth;
