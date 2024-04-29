// La mayoria de estas cosas las saco de la documentacion.
//Esta libreria sirve para verificar en los diferentes endpoint si tiene el jwt que se la da al inciar la sesion.
//Esto compara nuestra jws con el token que nos brinda el usuario por heraders.
const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('./../../../config/config');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';

const JwtStrategy = new Strategy(opts, (jwt_payload, done) => {
  return done(null, jwt_payload);
});

module.exports = JwtStrategy;
