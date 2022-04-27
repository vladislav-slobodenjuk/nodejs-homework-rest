const Errors = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  const { _id, password: DbPassword, subscription } = userAtDb;
  const passCompare = await bcrypt.compare(password, DbPassword);

  if (!passCompare) {
    throw new Errors.Unauthorized("Email or password is wrong");
  }
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ _id }, JWT_SECRET_KEY, { expiresIn: "1d" });

  res.json({
    status: "success",
    code: 200,
    token,
    user: { email, subscription },
  });
};

const logout = async (req, res) => {};

module.exports = { register, login, logout };
