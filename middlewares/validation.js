const Errors = require("http-errors");

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    const customError = Errors.BadRequest(error.message);
    next(customError);

    // console.log("err.details:", error.details);
    // return res
    //   .status(400)
    //   .json({ status: "error", code: 400, message: err.message });
  }
};

module.exports = validateBody;
