const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://client-interface-order-solutions-production.up.railway.app',
  'https://admin-eshop-production.up.railway.app',
  'https://pediclick-admin.vercel.app',
  'https://interface-cliente-react-os.vercel.app',
  'https://admin-eshop-psi.vercel.app',
  'Ejemplo',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

require('./utils/auth');

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mi port ${port}`);
});

module.exports = app;
