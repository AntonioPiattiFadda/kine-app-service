const express = require('express');

const ExerciseService = require('../services/exercise.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createExerciseSchema,
  updateExerciseSchema,
  getExerciseSchema,
} = require('../schemas/exercise.schema');

const router = express.Router();
const service = new ExerciseService();

//NOTE - No estan validados los endpoints
router.get('/', async (req, res, next) => {
  try {
    const exercise = await service.find();
    res.json(exercise);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getExerciseSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  router.post(
    '/',
    validatorHandler(createExerciseSchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newExercise = await service.create(body);
        res.status(201).json(newExercise);
      } catch (error) {
        next(error);
      }
    }
  )
);

router.patch(
  '/:id',
  validatorHandler(getExerciseSchema, 'params'),
  validatorHandler(updateExerciseSchema, 'body'),
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
  validatorHandler(getExerciseSchema, 'params'),
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
