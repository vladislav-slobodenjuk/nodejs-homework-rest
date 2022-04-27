const Errors = require("http-errors");
const bcrypt = require("bcrypt");
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
  console.log("login");
};

const logout = async (req, res) => {};

module.exports = { register, login, logout };
