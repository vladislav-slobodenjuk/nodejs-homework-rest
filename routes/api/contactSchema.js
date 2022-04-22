const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(35).required(),
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

module.exports = contactSchema;
