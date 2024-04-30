const { Model, DataTypes, Sequelize } = require('sequelize');

const { PROFESSIONAL_TABLE } = require('./professional.model');
 
const PATIENTS_TABLE = 'patients';

const PatientsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    field: 'last_name',
    allowNull: false,
    type: DataTypes.STRING,
  },
  patology: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  professionalId: {
    field: 'professional_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROFESSIONAL_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Patient extends Model {
  static associate(models) {
    this.belongsTo(models.Professional, { as: 'professional' });
    this.hasMany(models.Plan, {
      as: 'plans',
      foreignKey: 'patientId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PATIENTS_TABLE,
      modelName: 'Patient',
      timestamps: false,
    };
  }
}

module.exports = { Patient, PatientsSchema, PATIENTS_TABLE };
