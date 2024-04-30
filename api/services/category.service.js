const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor() {}
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }
  async findWithItems() {
    const categories = await models.Category.findAll({
      include: ['exercise'],
    });
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['exercise'],
    });
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, updatedData) {
    const category = await this.findOne(id);
    if (!category) {
      throw boom.notFound('category not found');
    }
    await models.Category.update(updatedData, {
      where: { id },
    });
    const updatedCategory = await models.Category.findByPk(id);
    return updatedCategory;
  }

  async delete(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('product not found');
    }
    await models.Category.destroy({
      where: { id },
    });
    return { id };
  }
}

module.exports = CategoryService;
