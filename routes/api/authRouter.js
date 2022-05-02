const express = require("express");

const {
  register,
  login,
  logout,
  verifyUser,
  reVerifyUser,
} = require("../../controllers/authController");

const errorWrapper = require("../../middlewares/errorWrapper");
const validateBody = require("../../middlewares/validation");
const guard = require("../../middlewares/guard");
const { schemaRegUser, schemaLoginUser } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemaRegUser), errorWrapper(register));

router.get("/verify/:verificationToken", errorWrapper(verifyUser));
router.post("/verify/", errorWrapper(reVerifyUser));

router.post("/login", validateBody(schemaLoginUser), errorWrapper(login));
router.post("/logout", guard, errorWrapper(logout));

module.exports = router;

// SENDGRID_API_KEY=
// SENDGRID_FROM=
// USER_NODEMAILER=
