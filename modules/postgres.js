const { Sequelize } = require("sequelize");
const UserModel = require("../models/UserModel");
const LectureModel = require('../models/LectureModel')
const BookinModel = require('../models/bookingModel')

const relations = require("./relations");

const sequelize = new Sequelize(process.env.SQL_CONNECTION_STRING, {
    logging: false,
});

async function postgres() {
    try {
        await sequelize.authenticate();

        let db = {};

        db.users = await UserModel(Sequelize, sequelize);
        db.lectures = await LectureModel(Sequelize,sequelize);
        db.booking = await BookinModel(Sequelize,sequelize);

        await relations(db);

        await sequelize.sync({ force:true });

        return db;
    } catch (error) {
        console.log("SQL_ERROR", error);
    }
}

module.exports = postgres;
