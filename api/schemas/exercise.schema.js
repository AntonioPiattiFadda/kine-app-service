const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const videoLink = Joi.string().uri();

const createExerciseSchema = Joi.object({
  name: name.required(),
  image: image.required(),
  description: description.required(),
  videoLink: videoLink.required(),
  categoryId: categoryId.required(),
});

const updateExerciseSchema = Joi.object({
  name,
  image,
  description,
  categoryId,
  videoLink,
});

const getExerciseSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createExerciseSchema,
  updateExerciseSchema,
  getExerciseSchema,
};
