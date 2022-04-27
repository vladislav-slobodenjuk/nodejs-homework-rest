const express = require("express");
const getCurrent = require("../../../controllers/users");
const guard = require("../../../middlewares/guard");
const errorWrapper = require("../../../middlewares/errorWrapper");

const router = express.Router();

router.get("/current", guard, errorWrapper(getCurrent));

module.exports = router;
