const Router = require("express").Router();


Router.use("/users", require("./userRoute"));
Router.use("/lecture",require("./lectureRoute"))
Router.use("/booking",require("./bookingRoute"))


module.exports = Router;