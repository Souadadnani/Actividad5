const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./noticias/infrastructure/rest/noticias.router.ts', './periodistas/infrastructure/rest/periodistas.router.ts'];

swaggerAutogen(outputFile, routes, doc);

/* then(() => {
require('./index')}); */