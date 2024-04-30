// const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ExerciseService {
  constructor() {
    this.exercise = [];
  }
  async create(data) {
    const newExercise = await models.Exercise.create(data);
    return newExercise;
  }

  async find() {
    const options = {
      include: ['category'],
      where: {},
    };

    const exercise = await models.Exercise.findAll(options);
    return exercise;
  }

  async findOne(id) {
    const exercise = await models.Exercise.findByPk(id, {
      include: 'category',
    });
    if (!exercise) {
      throw boom.notFound('exercise not found');
    }
    return exercise;
  }

  async update(id, updatedData) {
    const exercise = await models.Exercise.findByPk(id);
    if (!exercise) {
      throw boom.notFound('Exercise not found');
    }

    await models.Exercise.update(updatedData, {
      where: { id },
    });

    const updatedExercise = await models.Exercise.findByPk(id);

    return updatedExercise;
  }

  async delete(id) {
    const exercise = await models.Exercise.findByPk(id);
    if (!exercise) {
      throw boom.notFound('exercise not found');
    }
    await models.Exercise.destroy({
      where: { id },
    });
    return { id };
  }
}

module.exports = ExerciseService;
