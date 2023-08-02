const Validations = require("../modules/validation");
const {sendEmail} = require('../modules/email')
const createToken = require("../modules/jwt");
const {generateCrypt, compareCrypt} = require("../modules/bcrypt");
module.exports = class UserController {
    static async UserSignUpPostController(req, res, next) {
        try {
            const data = await Validations.SignUpValidation(req.body);

            const user = await req.db.users.create({
                fullname: data.fullname,
                email: data.email,
                password: generateCrypt(data.password),
                role: data.role
            });

            await sendEmail(
                `Please click to link: http://3.122.136.169:8000/v1/users/verify/${user.dataValues.id}`,
                data.email
            );

            res.status(201).json({
                ok: true,
                message: "Verification link sent to email",
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async UserVerifyAccountByLinkController(req, res, next) {
        try {
            const id = req.params.verify_id;

            const user = await req.db.users.findOne({
                where: {
                    id,
                },
            });

            if (!user) throw new Error("User not found");

            await req.db.users.update(
                {
                    user_is_verified: true,
                },
                {
                    where: {
                        id,
                    },
                }
            );

            const token = createToken({
                id,
            });

            res.json({
                ok: true,
                message: "Account successfully verificed",
                data: {
                    token,
                },
            });
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + "",
            });
        }

    };

    static async UserLoginPostController(req, res, next) {
        try {
            const data = await Validations.SignUpValidation(req.body);

            const user = await req.db.users.findOne({
                where: {
                    email: data.email,
                },
            });

            if (!user) throw new Error("user not found");

            console.log(data.password);

            const isTrust = compareCrypt(
                data.password,
                user.dataValues.password
            );

            if (!isTrust) throw new Error("password is incorrect");

            const token = createToken({
                id: user.dataValues.id,
            });

            res.json({
                ok: true,
                message: "Logged successfully",
                data: {
                    token,
                },
            });
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + "",
            });
        }
    }
    static async UserList(req, res,next) {
        try {
            const users = await req.db.users.findAll();
            res.json(users);
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + "",
            });

        }
    }

}

