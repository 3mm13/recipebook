const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipe Book API',
    description: 'This is an API that will retrieve all of the yummiest recipes just for YOU',
  },
  host: 'recipebook-1sdl.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });