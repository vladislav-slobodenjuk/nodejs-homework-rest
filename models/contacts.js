const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");
console.log("contactsPath:", contactsPath);

const readContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const addContact = async (body) => {
  const contacts = await readContacts();
  const newContact = { id: randomUUID(), ...body };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);

  if (contactIdx < 0) return null;

  const [contact] = contacts.splice(contactIdx, 1); // деструк-ция поскольку splice возвращает массив
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);

  if (contactIdx < 0) return null;

  contacts[contactIdx] = { ...contacts[contactIdx], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
