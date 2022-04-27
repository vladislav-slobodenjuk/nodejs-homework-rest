const Errors = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
// const contactRepository = require("../../repository/contacts");

const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const userAtDb = await User.findOne({ email });

  if (userAtDb) {
    throw new Errors.Conflict(`Email ${email} is in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const { subscription } = await User.create({ email, password: hashPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    user: { email, subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userAtDb = await User.findOne({ email });

  if (!userAtDb) {
    throw new Errors.Unauthorized("Email or password is wrong");
  }
  const passCompare = await bcrypt.compare(password, userAtDb.password);

  if (!passCompare) {
    throw new Errors.Unauthorized("Email or password is wrong");
  }
  console.log(SECRET_KEY);
  // console.log(userAtDb._id);
  const token = jwt.sign(userAtDb._id, SECRET_KEY, { expiresIn: "1d" });
  console.log(token);
  res.status({
    status: "success",
    code: 200,
    token,
    user: {
      email,
      subscription: userAtDb.subscription,
    },
  });
};

const logout = async (req, res) => {};

module.exports = { register, login, logout };
