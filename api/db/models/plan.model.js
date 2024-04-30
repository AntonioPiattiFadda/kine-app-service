const { Model, DataTypes, Sequelize } = require('sequelize');
const { PATIENTS_TABLE } = require('./patient.model');

const PLAN_TABLE = 'plans';

const PlanSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  patientId: {
    field: 'patient_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PATIENTS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};
class Plan extends Model {
  static associate(models) {
    this.belongsTo(models.Patient, {
      as: 'patient',
    });

    this.belongsToMany(models.Exercise, {
      as: 'exercises', // Alias para la relación, permite acceder a través de plan.exercises
      through: models.PlanExercise, // Modelo de unión utilizado para conectar Plan y Exercise
      foreignKey: 'planId', // Clave foránea en la tabla de unión que referencia a Plan
      otherKey: 'exerciseId', // Clave foránea en la tabla de unión que referencia a Exercise
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLAN_TABLE,
      modelName: 'Plan',
      timestamps: false,
    };
  }
}

module.exports = { Plan, PlanSchema, PLAN_TABLE };
