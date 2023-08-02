const Router = require("express").Router();
const {scheduleLecture,listLecture,getLectureById} = require("../controller/lectureController")

Router.post("/add",scheduleLecture);
Router.get("/list",listLecture);
Router.get('/:id', getLectureById);




module.exports = Router;