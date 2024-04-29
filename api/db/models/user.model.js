const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';
// Falta direccion y redes sociales si tiene, telefono de whatsapp

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  adress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  whatsAppPhone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  instagram: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  facebook: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  imgLogo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  pricePerHundredMeters: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId',
    });
    this.hasMany(models.Schedule, {
      as: 'schedules',
      foreignKey: 'userId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
