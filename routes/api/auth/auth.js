const express = require("express");

const { register, login, logout } = require("../../../controllers/auth");

const errorWrapper = require("../../../middlewares/errorWrapper");
const validateBody = require("../../middlewares/validation");
const { schemaRegisterUser, schemaLoginUser } = require("../../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemaRegisterUser),
  errorWrapper(register)
);
router.post("/login", validateBody(schemaLoginUser), errorWrapper(login));
router.post("/logout", errorWrapper(logout));

module.exports = router;
