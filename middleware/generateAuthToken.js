const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (data) => {
    const token = jwt.sign(data,config.get("jwtPrivateKey"));
    return token;
}