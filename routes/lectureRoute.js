const Router = require("express").Router();
const {scheduleLecture,listLecture} = require("../controller/lectureController")

Router.post("/add",scheduleLecture);
Router.get("/list",listLecture);



module.exports = Router;