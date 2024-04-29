const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ScheduleService {
  constructor() {}

  async create(data) {
    const newSchedule = await models.Schedule.create({
      ...data,
    });
    return newSchedule;
  }

  async find() {
    const rta = await models.Schedule.findAll({
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const schedule = await models.Schedule.findByPk(id);
    if (!schedule) {
      throw boom.notFound('schedule not found');
    }
    return schedule;
  }

  async update(id, changes) {
    const schedule = await this.findOne(id);
    const rta = await schedule.update(changes);
    return rta;
  }

  async delete(id) {
    const schedule = await this.findOne(id);
    await schedule.destroy();
    return { id };
  }
}

module.exports = ScheduleService;
