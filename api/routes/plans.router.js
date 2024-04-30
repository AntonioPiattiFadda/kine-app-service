const express = require('express');

const PlanService = require('../services/plan.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getPlanSchema,
  addExerciseSchema,
  createPlanSchema,
  updatePlanSchema,
} = require('../schemas/plan.schema');

const router = express.Router();
const service = new PlanService();

router.get('/', async (req, res, next) => {
  try {
    const plans = await service.findAll();
    res.json(plans);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getPlanSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const plan = await service.findOne(id);
      res.json(plan);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(updatePlanSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPlan = await service.create(body);
      res.status(201).json(newPlan);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res, next) => {
  validatorHandler(createPlanSchema, 'body');
  try {
    const body = req.body;
    const newPlan = await service.create(body);
    res.status(201).json(newPlan);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/add-exercise',
  validatorHandler(addExerciseSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newExercise = await service.addExercise(body);
      res.status(201).json(newExercise);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(getPlanSchema, 'params'),
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
