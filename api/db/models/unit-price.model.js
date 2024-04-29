const { Model, DataTypes } = require('sequelize');

const { PRODUCT_TABLE } = require('./product.model');
const UNIT_PRICE_TABLE = 'unit_price';

const UnitPriceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.ENUM(
      'Unidad',
      '1kg',
      '100gr',
      '200gr',
      '300gr',
      '500gr',
      'Docena',
      '2kg',
      '3kg',
      '4kg',
      '5kg',
      '10kg'
    ),
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  blocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  productId: {
    field: 'product_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
  },
};

class UnitPrice extends Model {
  static associate(models) {
    this.belongsTo(models.Product, { as: 'product' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: UNIT_PRICE_TABLE,
      modelName: 'UnitPrice',
      timestamps: false,
    };
  }
}

module.exports = { UnitPrice, UnitPriceSchema, UNIT_PRICE_TABLE };
