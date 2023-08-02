const Router = require("express").Router();
const {bookSeat,listBookings,getBookingById} = require("../controller/bookingController")

Router.post("/add",bookSeat);
Router.get("/list",listBookings)
Router.get('/:id', getBookingById);



module.exports = Router;