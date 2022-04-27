const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../../controllers/contacts");

const guard = require("../../../middlewares/guard");
const validateBody = require("../../../middlewares/validation");
const {
  schemaCreateContact,
  schemaUpdateStatus,
} = require("./contactValidationSchema");

const router = express.Router();

router.get("/", guard, listContacts);

router.get("/:contactId", guard, getContactById);

router.post("/", guard, validateBody(schemaCreateContact), addContact);

router.delete("/:contactId", guard, removeContact);

router.put(
  "/:contactId",
  guard,
  validateBody(schemaCreateContact),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  guard,
  validateBody(schemaUpdateStatus),
  updateStatusContact
);

module.exports = router;
