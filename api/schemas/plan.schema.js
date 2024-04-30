const Joi = require('joi');

const id = Joi.number().integer();
const patientId = Joi.number().integer();
const planId = Joi.number().integer();
const exerciseId = Joi.number().integer();

const getPlanSchema = Joi.object({
  id: id.required(),
});

const createPlanSchema = Joi.object({
  patientId: patientId.required(),
});

const updatePlanSchema = Joi.object({
  patientId: patientId.required(),
});

const addExerciseSchema = Joi.object({
  planId: planId.required(),
  exerciseId: exerciseId.required(),
});

module.exports = {
  getPlanSchema,
  createPlanSchema,
  addExerciseSchema,
  updatePlanSchema,
};
