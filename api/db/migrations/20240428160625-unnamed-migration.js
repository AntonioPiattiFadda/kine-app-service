'use strict';

const { EXERCISE_TABLE } = require('../models/exercise.model');
const { PLAN_EXERCISE_TABLE } = require('../models/plan-exercise.model');
const { PLAN_TABLE } = require('../models/plan.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(PLAN_EXERCISE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      planId: {
        field: 'plan_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: EXERCISE_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PLAN_EXERCISE_TABLE);
  },
};
