// const jwt = require("jsonwebtoken");
//
// function authorizeUser(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).json({ message: "Token xato" });
//     }
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//         return res.status(401).json({ message: "Token xato" });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_WORD);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: "Token xato" });
//     }
// }
// module.exports = authorizeUser