const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UnitPriceService {
  constructor() {
    this.unitPrices = [];
  }

  async create(data) {
    const newUnitPrice = await models.UnitPrice.create(data);
    return newUnitPrice;
  }

  async find() {
    const options = {
      include: [
        {
          model: models.Product,
          as: 'product',
          where: {},
        },
      ],
      where: {},
    };
    const unitPrices = await models.UnitPrice.findAll(options);
    return unitPrices;
  }

  async findOne(id) {
    const unitPrice = await models.UnitPrice.findByPk(id, {
      include: ['product'],
    });
    if (!unitPrice) {
      throw boom.notFound('Unit price not found');
    }
    return unitPrice;
  }

  async findAllForOneProduct(id) {
    const product = await models.Product.findByPk(id, {
      include: ['unit_price'],
    });
    if (!product) {
      throw boom.notFound('unit prices not founded');
    }
    const unitPrices = product.unit_price.map((price) => price.toJSON());

    return unitPrices;
  }

  async update(id, updatedData) {
    const unitPrice = await models.UnitPrice.findByPk(id);
    if (!unitPrice) {
      throw boom.notFound('Unit price not found');
    }

    await models.UnitPrice.update(updatedData, {
      where: { id },
    });

    const updatedUnitPrice = await models.UnitPrice.findByPk(id);

    return updatedUnitPrice;
  }

  async delete(id) {
    const unitPrice = await models.UnitPrice.findByPk(id);
    if (!unitPrice) {
      throw boom.notFound('Unit price not found');
    }
    const count = await models.UnitPrice.count({
      where: {
        productId: unitPrice.productId,
      },
    });
    if (count > 1) {
      await models.UnitPrice.destroy({
        where: { id },
      });
      return { id };
    } else {
      throw boom.badRequest(
        'No puedes eliminar el ultimo precio, agrega otro primero'
      );
    }
  }
}

module.exports = UnitPriceService;
