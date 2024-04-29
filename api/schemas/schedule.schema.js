const Joi = require('joi');

const id = Joi.number().integer();
const day = Joi.string();
const firstStartAt = Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
const firstEndAt = Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
const secondStartAt = Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
const secondEndAt = Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
const userId = Joi.number().integer();

const createScheduleSchema = Joi.object({
  day: day.required(),
  firstStartAt: firstStartAt.required(),
  firstEndAt: firstEndAt.required(),
  secondStartAt,
  secondEndAt,
  userId: userId.required(),
});

const updateScheduleSchema = Joi.object({
  firstStartAt: firstStartAt,
  firstEndAt: firstEndAt,
  secondStartAt,
  secondEndAt,
});

const getScheduleSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createScheduleSchema,
  updateScheduleSchema,
  getScheduleSchema,
};
