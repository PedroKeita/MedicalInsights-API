import { Application } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";

export function setupSwagger(app: Application): void {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Medical Insights API",
        version: "1.0.0",
        description: "API para gerenciamento de pacientes",
      },
      servers: [
        {
          url: "http://localhost:3000/api",
        },
      ],
    },
    apis: ["./src/routes/*.ts"], 
  };

  const specs = swaggerJsdoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
}