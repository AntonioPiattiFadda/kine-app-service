// const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');

class ProductsService {
  constructor() {
    this.products = [];
  }
  async create(data, unitPrice) {
    const transaction = await sequelize.transaction();
    try {
      const newProduct = await models.Product.create(data, {
        transaction: transaction,
      });
      unitPrice.forEach((element) => {
        element.productId = newProduct.id;
      });

      await Promise.all(
        unitPrice.map((element) => {
          return models.UnitPrice.create(element, {
            transaction: transaction,
          });
        })
      );
      await transaction.commit();

      return { newProduct, unitPrice };
    } catch (error) {
      await transaction.rollback();
      return {
        msg: 'error',
        error: error,
      };
    }
  }

  async find() {
    const options = {
      include: ['category', 'unit_price'],
      where: {},
    };
    // const { limit, offset } = query;
    // if (limit && offset) {
    //   options.limit = limit;
    //   options.offset = offset;
    // }

    // const { price } = query;
    // if (price) {
    //   options.where.price = price;
    // }

    // const { price_min, price_max } = query;
    // if (price_min && price_max) {
    //   options.where.price = {
    //     [Op.gte]: price_min,
    //     [Op.lte]: price_max,
    //   };
    // }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['unit_price'],
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, updatedData) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }

    await models.Product.update(updatedData, {
      where: { id },
    });

    const updatedProduct = await models.Product.findByPk(id);

    return updatedProduct;
  }

  async delete(id) {
    // Tengo que elimnar los unit_price asociados al producto
    const unitPrice = await models.UnitPrice.findAll({
      where: { productId: id },
    });
    if (!unitPrice) {
      throw boom.notFound('Unit price not found');
    }
    await models.UnitPrice.destroy({
      where: { productId: id },
    });
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    await models.Product.destroy({
      where: { id },
    });
    return { id };
  }
}

module.exports = ProductsService;
