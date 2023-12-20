const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger-output.json';
const routes = ['./periodistas/infrastructure/rest/periodistas.router.ts', './noticias/infrastructure/rest/noticias.router.ts'];

swaggerAutogen(outputFile, routes, doc);
