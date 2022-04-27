const express = require("express");

const { register, login, logout } = require("../../../controllers/auth");

const errorWrapper = require("../../../middlewares/errorWrapper");
const validateBody = require("../../../middlewares/validation");
const guard = require("../../../middlewares/guard");
const { schemaRegUser, schemaLoginUser } = require("../../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemaRegUser), errorWrapper(register));
router.post("/login", validateBody(schemaLoginUser), errorWrapper(login));
router.post("/logout", guard, errorWrapper(logout));

module.exports = router;
