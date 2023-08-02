require("dotenv").config();
const express = require("express");
const routes = require("./routes/route");

const postgres = require("./modules/postgres");


const app = express();
app.listen(process.env.PORT);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


// Swagger spetsifikatsiyalarini yaratish
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API dokumentatsiyasi',
            version: '1.0.0',
            description: 'API-ni tavsiflash',
        },
        servers: [
            {
                url: process.env.PORT, // Ilova manzili
            },
        ],
    },
    apis: ['./routes/*.js'], // API-endpoint fayllari
};
/**
 * @swagger
 * /v1/users/list:
 *   get:
 *     summary: Endpoint tavsifi
 *     description: Endpointning tavsifi
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli javob
 */
const swaggerSpec = swaggerJsdoc(swaggerOptions);


async function server() {
    let db = await postgres();

    app.use((req, res, next) => {
        req.db = db;
        next();
    });
    app.use("/v1", routes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




}
server()