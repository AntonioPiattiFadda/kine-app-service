const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class PatientService {
  constructor() {}
  async find() {
    const rta = await models.Patient.findAll({
      include: ['professional', 'plans'],
    });
    return rta;
  }

  async findOne(id) {
    const patient = await models.Patient.findByPk(id, {
      include: {
        model: models.Plan,
        as: 'plans',
        include: 'exercises',
      },
    });
    if (!patient) {
      throw boom.notFound('patient not found');
    }
    return patient;
  }

  async create(data) {
    const newPatient = await models.Patient.create(data, {
      include: ['professional'],
    });
    return newPatient;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = PatientService;
