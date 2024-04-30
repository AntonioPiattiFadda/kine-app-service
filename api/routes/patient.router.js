const express = require('express');

const PatientService = require('../services/patient.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPatientSchema,
  getPatientSchema,
  updatePatientSchema,
} = require('../schemas/patient.schema');

const router = express.Router();
const service = new PatientService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    res.json(await service.findOne(id));
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createPatientSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getPatientSchema, 'params'),
  validatorHandler(updatePatientSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getPatientSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
