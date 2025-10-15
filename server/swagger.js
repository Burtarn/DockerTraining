
    import swaggerJsDoc from "swagger-jsdoc";
    import swaggerUi from "swagger-ui-express";

    const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "Basic Express API",
        version: "1.0.0",
        description: "En enkel API för test och dokumentation",
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

    const setupSwagger = (app) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    };

    export default setupSwagger;
