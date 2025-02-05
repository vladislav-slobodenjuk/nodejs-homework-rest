const Errors = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");

const { User } = require("../models/user");
const {
  createEmailTemplate,
  sendEmailByNodemailer,
  // sendEmailBySendGrid,
} = require("../services/email");

const register = async (req, res) => {
  const { email, password } = req.body;
  const userAtDb = await User.findOne({ email });

  if (userAtDb) {
    throw new Errors.Conflict(`Email ${email} is in use`);
  }

  const verificationToken = randomUUID();
  const template = createEmailTemplate(email, verificationToken);
  try {
    await sendEmailByNodemailer(email, template);
  } catch (error) {
    console.error(error);
    throw new Errors.ServiceUnavailable("Error sending email");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const { subscription, avatarURL } = await User.create({
    email,
    password: hashPassword,
    verificationToken,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    user: { email, subscription, avatarURL },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userAtDb = await User.findOne({ email });

  if (!userAtDb) {
    throw new Errors.Unauthorized("Email or password is wrong");
  }
  const { _id, password: DbPassword, subscription, avatarURL } = userAtDb;
  const passCompare = await bcrypt.compare(password, DbPassword);

  if (!passCompare) {
    throw new Errors.Unauthorized("Email or password is wrong");
  }
  if (!userAtDb?.isVerified) {
    throw new Errors.BadRequest("User is not verified");
  }

  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ _id }, JWT_SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(_id, { token }, { new: true });

  res.json({
    status: "success",
    code: 200,
    token,
    user: { email, subscription, avatarURL },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  const userAtDb = await User.findOne({ verificationToken });

  if (!userAtDb) throw new Errors.NotFound("User not found");

  if (userAtDb.isVerified) {
    throw new Errors.BadRequest("Verification has already been passed");
  }
  await User.findByIdAndUpdate(userAtDb._id, { isVerified: true });

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

const reVerifyUser = async (req, res) => {
  const { email } = req.body;
  const userAtDb = await User.findOne({ email });

  if (!userAtDb) throw new Errors.NotFound("User not found");

  if (userAtDb.isVerified) {
    throw new Errors.BadRequest("Verification has already been passed");
  }

  const template = createEmailTemplate(email, userAtDb.verificationToken);
  try {
    await sendEmailByNodemailer(email, template);
  } catch (error) {
    console.error(error);
    throw new Errors.ServiceUnavailable("Error sending email");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = { register, login, logout, verifyUser, reVerifyUser };
