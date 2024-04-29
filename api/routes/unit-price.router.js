const express = require('express');

const UnitPriceService = require('../services/unit-price.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createUnitPriceSchema,
  getUnitPriceSchema,
  updateUnitPriceSchema,
  getAllProductUnitPricesSchema,
} = require('../schemas/unit-price.schema');

const router = express.Router();
const service = new UnitPriceService();

router.get('/', async (req, res, next) => {
  try {
    const unitPrices = await service.find();
    res.json(unitPrices);
  } catch (error) {
    next(error);
  }
});
// router.get(
//   '/:id',
//   validatorHandler(getUnitPriceSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const unitPrice = await service.findOne(id);
//       res.json(unitPrice);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.get(
  '/:productId',
  validatorHandler(getAllProductUnitPricesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const unitPrice = await service.findAllForOneProduct(productId);
      res.json(unitPrice);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUnitPriceSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUnitPrice = await service.create(body);
      res.status(201).json(newUnitPrice);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  '/:id',
  validatorHandler(getUnitPriceSchema, 'params'),
  validatorHandler(updateUnitPriceSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(getUnitPriceSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
