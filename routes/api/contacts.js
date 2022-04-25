const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const validateBody = require("../../middlewares/validation");
const {
  schemaCreateContact,
  schemaupdateStatus,
} = require("./contactValidationSchema");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(schemaCreateContact), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateBody(schemaCreateContact), updateContact);

router.patch(
  "/:contactId/favorite",
  validateBody(schemaupdateStatus),
  updateStatusContact
);

module.exports = router;
