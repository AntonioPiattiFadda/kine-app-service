const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const value = Joi.number().integer().min(10);
const blocked = Joi.boolean();
const productId = Joi.number().integer();

const getUnitPriceSchema = Joi.object({
  id: id.required(),
});

const getAllProductUnitPricesSchema = Joi.object({
  productId: productId,
});

const createUnitPriceSchemaWithProducts = Joi.object({
  name: name.required(),
  value: value.required(),
});
const createUnitPriceSchema = Joi.object({
  name: name.required(),
  value: value.required(),
  productId: productId.required(),
});

const updateUnitPriceSchema = Joi.object({
  name: name,
  value: value,
  blocked,
});

module.exports = {
  getUnitPriceSchema,
  createUnitPriceSchema,
  createUnitPriceSchemaWithProducts,
  updateUnitPriceSchema,
  getAllProductUnitPricesSchema,
};
