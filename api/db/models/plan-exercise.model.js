const { Model, DataTypes, Sequelize } = require('sequelize');

const { PLAN_TABLE } = require('./plan.model');
const { EXERCISE_TABLE } = require('./exercise.model');

const PLAN_EXERCISE_TABLE = 'plan_exercise';

const PlanExerciseSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  planId: {
    field: 'plan_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PLAN_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  exerciseId: {
    field: 'exercise_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: EXERCISE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class PlanExercise extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLAN_EXERCISE_TABLE,
      modelName: 'PlanExercise',
      timestamps: false,
    };
  }
}

module.exports = { PlanExercise, PlanExerciseSchema, PLAN_EXERCISE_TABLE };
