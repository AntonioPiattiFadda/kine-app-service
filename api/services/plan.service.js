const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class PlanService {
  constructor() {}

  async create(data) {
    const newPlan = await models.Plan.create(data);
    return newPlan;
  }

  async addExercise(data) {
    const newExercise = await models.PlanExercise.create(data);
    return newExercise;
  }

  async findByUserId(patientId) {
    const plans = await models.Plan.findAll({
      where: {
        '$patient.id$': patientId,
      },
    });
    return plans;
  }

  async findAll() {
    const plans = await models.Plan.findAll();
    return plans;
  }

  async findOne(id) {
    const plan = await models.Plan.findByPk(id, {
      include: ['exercises'],
    });
    if (!plan) {
      throw boom.notFound('plan not found');
    }
    return plan;
  }

  //FIXME - No funciona el delete ni el update
  async update(id, updatedData) {
    const plan = await this.findOne(id);
    if (!plan) {
      throw boom.notFound('plan not found');
    }
    await models.Plan.update(updatedData, {
      where: { id },
    });
    const updatedPlan = await models.Plan.findByPk(id);
    return updatedPlan;
  }

  async delete(id) {
    const plan = await models.Plan.findByPk(id);
    if (!plan) {
      throw boom.notFound('plan not found');
    }
    await models.Plan.destroy({
      where: { id },
    });
    return { id };
  }
}

module.exports = PlanService;
