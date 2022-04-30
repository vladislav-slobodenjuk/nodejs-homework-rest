const express = require("express");

const { getCurrent, avatar } = require("../../controllers/usersController");
const guard = require("../../middlewares/guard");
const errorWrapper = require("../../middlewares/errorWrapper");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.get("/current", guard, errorWrapper(getCurrent));
router.patch("/avatars", guard, upload.single("avatar"), errorWrapper(avatar));

module.exports = router;
