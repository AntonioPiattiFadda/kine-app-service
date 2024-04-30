const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class ProfessionalService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newProfessional = await models.Professional.create({
      ...data,
      password: hash,
    });
    delete newProfessional.dataValues.password;
    return newProfessional;
  }

  async find() {
    const rta = await models.Professional.findAll({
      include: ['patient'],
    });
    return rta;
  }

  async findOne(id) {
    const professional = await models.Professional.findByPk(id);
    if (!professional) {
      throw boom.notFound('professional not found');
    }
    return professional;
  }

  async findByEmail(email) {
    const professional = await models.Professional.findOne({
      where: { email },
      include: ['patient'],
    });
    if (!professional) {
      throw boom.unauthorized();
    }
    return professional;
  }

  async update(id, changes) {
    const professional = await this.findOne(id);
    const rta = await professional.update(changes);
    return rta;
  }

  async delete(id) {
    const professional = await this.findOne(id);
    await professional.destroy();
    return { id };
  }
}

module.exports = ProfessionalService;
