const { UserSignUpPostController,UserVerifyAccountByLinkController,UserLoginPostController,UserList } = require("../controller/userController");

const Router = require("express").Router();

Router.post("/account", UserSignUpPostController);
Router.get("/verify/:verify_id",UserVerifyAccountByLinkController);
Router.post("/login", UserLoginPostController);
Router.get("/list", UserList);



module.exports = Router;