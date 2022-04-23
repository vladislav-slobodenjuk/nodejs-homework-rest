const { Schema, model } = require("mongoose");

const contactSchema = Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  date: { type: Date, default: () => Date.now() },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
