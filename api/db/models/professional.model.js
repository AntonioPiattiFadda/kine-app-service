const { Model, DataTypes, Sequelize } = require('sequelize');

const PROFESSIONAL_TABLE = 'professionals';

const ProfessionalSchema = {
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
    defaultValue: 'professional',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Professional extends Model {
  static associate(models) {
    this.hasMany(models.Patient, {
      as: 'patient',
      foreignKey: 'professionalId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROFESSIONAL_TABLE,
      modelName: 'Professional',
      timestamps: false,
    };
  }
}

module.exports = { PROFESSIONAL_TABLE, ProfessionalSchema, Professional };
