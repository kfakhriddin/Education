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