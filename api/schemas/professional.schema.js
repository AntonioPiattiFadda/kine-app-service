const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const imgLogo = Joi.string().uri();

const createProfessionalSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
  imgLogo: imgLogo.required(),
});

const updateProfessionalSchema = Joi.object({
  email: email,
  role: role,
  imgLogo: imgLogo,
});

const getProfessionalSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProfessionalSchema,
  updateProfessionalSchema,
  getProfessionalSchema,
};
