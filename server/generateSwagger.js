import fs from "fs";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mitt super API",
      version: "1.0.0",
      description: "Test och dokumentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


if (!fs.existsSync("./docs")) {
  fs.mkdirSync("./docs");
}


fs.writeFileSync("./docs/swagger.json", JSON.stringify(swaggerDocs, null, 2));
console.log("Swagger documentation generated at ./docs/swagger.json");
