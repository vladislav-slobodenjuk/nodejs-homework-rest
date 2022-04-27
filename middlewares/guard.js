const Errors = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const guard = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY); // если проверка провалится вылетит ошибкаб иначе вернет payload
    const user = await User.findById(payload._id);
    if (!user || token !== user.token) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    next(Errors.Unauthorized("Not authorized"));
  }
};

module.exports = guard;
