const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const create = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const user = await Users.create(req.body);
    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // // Create a user with the daTa
    const user = await Users.create({ email, password: hashedPassword });

    res.status(200).json(user);

    console.log(user.password);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    // Get the email and password off rq body
    const { email, password } = req.body;

    // Find the user with requested email
    const user = await Users.findOne({ email });
    if (!user) return res.sendStatus(401);

    // Compare sent in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    // create a jwt token 30 days exp
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // Set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("email", email);

    // send it
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("Authorization", "", { expires: new Date() });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const checkAuth = (req, res) => {
  try {
    res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
};

module.exports = {
  create,
  login,
  logout,
  checkAuth,
};
