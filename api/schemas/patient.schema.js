const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const email = Joi.string().email();
const professionalId = Joi.number().integer();
const patology = Joi.string().min(3).max(30);
const planId = Joi.number().integer();
const lastName = Joi.string().min(3).max(30);

const getPatientSchema = Joi.object({
  id: id.required(),
});

const createPatientSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  patology: patology.required(),
  professionalId: professionalId.required(),
  lastName: lastName.required(),
  // NOTE Ver si al crear el plan se crea al Patien
  planId: planId,
});

const updatePatientSchema = Joi.object({
  name,
  lastName,
  patology,
  email,
  professionalId,
  planId,
});

module.exports = {
  getPatientSchema,
  createPatientSchema,
  updatePatientSchema,
};
