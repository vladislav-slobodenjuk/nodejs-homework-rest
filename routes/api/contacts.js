const express = require("express");

const contactController = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validation");
const contactSchema = require("./contactSchema");

const router = express.Router();

router.get("/", contactController.listContacts);

router.get("/:contactId", contactController.getContactById);

router.post("/", validateBody(contactSchema), contactController.addContact);

router.delete("/:contactId", contactController.removeContact);

router.put(
  "/:contactId",
  validateBody(contactSchema),
  contactController.updateContact
);

module.exports = router;
