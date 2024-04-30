const express = require('express');
const passport = require('passport');
const router = express.Router();
const OrderService = require('../services/plan.service');
const service = new OrderService();

//FIXME -  Todavia no programe esta ruta

router.get(
  '/my-plans',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUserId(user.sub);
      res.json({
        orders,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
