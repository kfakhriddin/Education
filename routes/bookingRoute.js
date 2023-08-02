const Router = require("express").Router();
const {bookSeat,listBookings} = require("../controller/bookingController")

Router.post("/add",bookSeat);
Router.get("/list",listBookings)


module.exports = Router;