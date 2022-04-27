const Errors = require("http-errors");
const { User } = require("../../models/user");
const guard = require("../../middlewares/guard");

const getCurrent = async (req, res) => {
  console.log(req.user);
};

module.exports = getCurrent;
