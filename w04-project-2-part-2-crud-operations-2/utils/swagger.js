import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Animals API',
    description: 'Perform CRUD operations with animals!'
  },
  host: 'localhost:5500',
  basePath: '/dashboard'
};

const outputFile = './swagger-output.json';
const routes = ["../routes/dashboardRoutes.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);