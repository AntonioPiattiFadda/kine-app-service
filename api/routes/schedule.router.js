const express = require('express');

const ScheduleService = require('../services/schedule.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createScheduleSchema,
  updateScheduleSchema,
  getScheduleSchema,
} = require('../schemas/schedule.schema');

const router = express.Router();
const service = new ScheduleService();

// router.get('/', async (req, res, next) => {
//   try {
//     const schedule = await service.find();
//     res.json(schedule);
//   } catch (error) {
//     next(error);
//   }
// });

router.get(
  '/:id',
  validatorHandler(getScheduleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const schedule = await service.findOne(id);
      res.json(schedule);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createScheduleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSchedule = await service.create(body);
      res.status(201).json(newSchedule);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getScheduleSchema, 'params'),
  validatorHandler(updateScheduleSchema, 'body'),
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
  validatorHandler(getScheduleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const schedule = await service.delete(id);
      res.json(schedule);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
