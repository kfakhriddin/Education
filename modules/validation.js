const Joi = require("joi");

module.exports = class Validations {
    static async SignUpValidation(data) {
        return Joi.object({
            fullname: Joi.string(),
            email: Joi.string()
                .email()
                .required()
                .error(new Error("Email is invalid")),
            password: Joi.string().required(),
            role: Joi.string()
        }).validateAsync(data);





    }
}