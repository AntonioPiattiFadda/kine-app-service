const express = require('express');

const exerciseRouter = require('./exercise.router');
const categoriesRouter = require('./categories.router');
const professionalRouter = require('./professional.router');
const planRouter = require('./plans.router');
const patientRouter = require('./patient.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/exercise', exerciseRouter);
  router.use('/category', categoriesRouter);
  router.use('/professional', professionalRouter);
  router.use('/plan', planRouter);
  router.use('/patient', patientRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
