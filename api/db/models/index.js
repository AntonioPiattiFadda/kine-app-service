const { Professional, ProfessionalSchema } = require('./professional.model');
const { Patient, PatientsSchema } = require('./patient.model');
const { Category, CategorySchema } = require('./category.model');
const { Exercise, ExerciseSchema } = require('./exercise.model');
const { Plan, PlanSchema } = require('./plan.model');
const { PlanExercise, PlanExerciseSchema } = require('./plan-exercise.model');

function setupModels(sequelize) {
  Professional.init(ProfessionalSchema, Professional.config(sequelize));
  Patient.init(PatientsSchema, Patient.config(sequelize));
  Plan.init(PlanSchema, Plan.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Exercise.init(ExerciseSchema, Exercise.config(sequelize));
  PlanExercise.init(PlanExerciseSchema, PlanExercise.config(sequelize));

  Professional.associate(sequelize.models);
  Patient.associate(sequelize.models);
  Plan.associate(sequelize.models);
  Category.associate(sequelize.models);
  Exercise.associate(sequelize.models);
  PlanExercise.associate(sequelize.models);
}

module.exports = setupModels;
