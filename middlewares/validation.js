const Errors = require("http-errors");

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    const customError = Errors.BadRequest(error.message);
    next(customError);
  }
};

module.exports = validateBody;
