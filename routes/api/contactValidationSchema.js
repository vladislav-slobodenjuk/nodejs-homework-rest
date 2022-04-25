const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .required(),
  phone: Joi.string()
    .pattern(/[0-9]+/)
    .required(),
});

const schemaupdateStatus = Joi.object({
  favorite: Joi.boolean().optional(),
});

module.exports = { schemaCreateContact, schemaupdateStatus };
