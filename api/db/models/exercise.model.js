const { Model, DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_TABLE } = require('./category.model');

const EXERCISE_TABLE = 'products';

const ExerciseSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  videoLink: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'video_link',
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
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

class Exercise extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
    this.belongsToMany(models.Plan, {
      as: 'plans', // Alias para la relación, permite acceder a través de exercise.plans
      through: models.PlanExercise, // Modelo de unión utilizado para conectar Exercise y Plan
      foreignKey: 'exerciseId', // Clave foránea en la tabla de unión que referencia a Exercise
      otherKey: 'planId', // Clave foránea en la tabla de unión que referencia a Plan
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EXERCISE_TABLE,
      modelName: 'Exercise',
      timestamps: false,
    };
  }
}

module.exports = { Exercise, ExerciseSchema, EXERCISE_TABLE };
