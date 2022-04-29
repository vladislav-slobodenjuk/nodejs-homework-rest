const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

const guard = require("../../middlewares/guard");
const validateBody = require("../../middlewares/validation");
const errorWrapper = require("../../middlewares/errorWrapper");
const {
  schemaCreateContact,
  schemaUpdateStatus,
} = require("../../models/contact");

const router = express.Router();

router.get("/", guard, errorWrapper(listContacts));

router.get("/:contactId", guard, errorWrapper(getContactById));

router.post(
  "/",
  guard,
  validateBody(schemaCreateContact),
  errorWrapper(addContact)
);

router.delete("/:contactId", guard, errorWrapper(removeContact));

router.put(
  "/:contactId",
  guard,
  validateBody(schemaCreateContact),
  errorWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  guard,
  validateBody(schemaUpdateStatus),
  errorWrapper(updateStatusContact)
);

module.exports = router;
