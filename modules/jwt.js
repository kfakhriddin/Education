const { sign, verify } = require("jsonwebtoken");

createToken = function createToken(data) {
    return sign(data, process.env.SECRET_WORD);
};

checkToken = function checkToken(token) {
    try {
        return verify(token, process.env.SECRET_WORD);
    } catch (error) {
        return false;
    }
};

module.exports = createToken,checkToken