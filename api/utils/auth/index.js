const passport = require('passport');

const passportLocal = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy')


passport.use(passportLocal);
passport.use(JwtStrategy);


