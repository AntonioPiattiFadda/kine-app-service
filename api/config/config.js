require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  dbUrlProd: process.env.DATABASE_URL_PROD,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  nodeMailUser: process.env.NODEMAIL_USER,
  nodeMailPassword: process.env.NODEMAIL_PASSWORD,
  changePasswordLink: process.env.CHANGE_PASSWORD_LINK,
};

module.exports = { config };
