import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// swagger 문서 정의
const swaggerDefinition = {
  info: {
    title: "Kids Keeper Dev API",
    version: "1.0.0",
    description: "Kids Keeper Developmenet API with express.",
  },
  host: "localhost:3000",
  basePath: "/",
};

const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpecs,
};
